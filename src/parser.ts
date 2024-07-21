import { Book, Clipping, ClippingType } from "./model";
import * as fs from 'fs';
import * as readline from 'readline';

export async function parseClippings(filePath: string): Promise<Book[]> {
    const numberPattern = /\s+(\d+)/;
    const clippingSeparator = '==========';

    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface(stream);

    var booksByHeader: { [key: string]: Book } = {};

    let current = new Clipping();
    let lineNum = 0;
    for await (const line of rl) {
        if (!line) {
            continue;
        }

        if (line === clippingSeparator) {
            if(!current.header) { continue; } // can't add a clipping if we couldn't extract a header value

            let book = getOrAdd(booksByHeader, current.header, x => new Book(x));
            book.clippings.push(current);

            current = new Clipping();
            lineNum = 0;
            continue;
        }

        switch (lineNum) {
            case 0:
                current.header = line;
                break;
            case 1:
                var parts = line.split('|');

                current.clippingType = parts[0].includes("Note") ? ClippingType.note : ClippingType.highlight;

                let match = parts[0].match(numberPattern);
                current.page = match ? +match[1] : undefined;

                match = parts[1].match(numberPattern);
                current.location = match ? +match[1] : 0;

                const dtString = parts[2]?.replace('Added on ', '');
                current.createdDate = new Date(dtString);

                break;
            default:
                current.content = current.content ? current.content += line : line;
        }

        lineNum++;
    }

    // sort the clippings by location and remove duplicate highlights
    for(const book of Object.values(booksByHeader)){
        book.clippings = book.clippings.sort((a,b) => a.location - b.location);

        for(let i = 0; i < book.clippings.length; i++){
            const curr = book.clippings[i];
            const next = book.clippings[i+1];

            if(!curr || !next){ 
                continue;
            }

            // when we find two highlight clippings with the same (start) location, delete the shorter one
            if(curr.location === next.location && curr.clippingType === ClippingType.highlight && next.clippingType === ClippingType.highlight){
                if((curr.content?.length || 0) < (next.content?.length || 0)){
                    book.clippings.splice(i, 1);
                    i--; // we need to process this index again, because it now contains the value that was in i+1
                } else {
                    book.clippings.splice(i+1, 1);
                }
            }
        }
    }

    return Object.values(booksByHeader);
}

function getOrAdd<T>(lookup: { [key: string]: T }, key: string, addFn : (key: string) => T) {
    let t = lookup[key];
    if(t === undefined){
        t = addFn(key);
        lookup[key] = t;
    }

    return t;
}