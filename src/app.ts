import path from "path";
import { toMarkdown } from "./mkd";
import { parseClippings } from "./parser";
const fs = require('fs').promises;
const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g;
const outputDir = 'clippings';

async function main(){
    if (process.argv.length <= 2) {
        console.log("Usage: node " + __filename + " path/to/clippings.txt");
        process.exit(-1);
      }
 
    const inputFile = process.argv[2];
    var books = await parseClippings(inputFile);

    await fs.mkdir(outputDir, { recursive: true });
    for(const book of books){
        const mkd = toMarkdown(book);
        const fileName = `${book.author} - ${book.title}.md`.replace(invalidChars, '');
        const filePath = path.join(outputDir, fileName);
        await fs.writeFile(filePath, mkd, 'utf8');
        console.log(`Wrote ${filePath}`);
    }
}

main();