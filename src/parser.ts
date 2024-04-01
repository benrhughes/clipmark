import { Book, Clipping, ClippingType } from "./model";
import * as fs from 'fs';
import * as readline from 'readline';

export async function parseClippings(filePath: string): Promise<Book[]> {
    const numberPattern = /\s+(\d+)/;
    const titleAuthorPattern = /^(.*?)\s*\(([^)]+)\)$/;
    const separator = '==========';

    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface(stream);

    const clippings: Clipping[] = [];
    let current = new Clipping();
    let lineNum = 0;
    for await (const line of rl) {
        if (!line) {
            continue;
        }

        if (line === separator) {
            clippings.push(current);
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

                break;
            default:
                current.content = current.content ? current.content += line : line;
        }

        lineNum++;
    }

    var lookup: { [key: string]: Book } = {};

    for (const clip of clippings) {
        if (clip.header === undefined) { continue; }

        let book = lookup[clip.header];
        if (!book) {
            book = new Book();
            const match = clip.header.match(titleAuthorPattern);
            if(match){
                book.title = match[1].trim();
                book.author = match[2].trim();
            }
            lookup[clip.header] = book;
        }

        book.clippings.push(clip);
    }

    
    for(const book of Object.values(lookup)){
        book.clippings = book.clippings.sort((a,b) => a.location - b.location);
    }

    return Object.values(lookup);
}