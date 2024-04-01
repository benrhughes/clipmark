import { Book, ClippingType } from "./model"

export function toMarkdown(book: Book){
    var s = `# ${book.title} - ${book.author}\n`
    for(const clip of book.clippings){
        if(clip.page && clip.page > 0){
            s += `## Page ${clip.page}\n`;
        }

        s += `### Location ${clip.location}\n`;

        if(clip.clippingType === ClippingType.highlight){
            s += '> ';
        }

        s += `${clip.content}\n\n`;
    }

    return s;

}