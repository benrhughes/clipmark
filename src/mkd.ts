import { Book, ClippingType } from "./model"

export function toMarkdown(book: Book){
    var s = `# ${book.title} - ${book.author}\n`

    let page = 0;
    let location = 0;
    for(const clip of book.clippings){
        if(clip.page && clip.page > 0){
            if(clip.page > page){
                s += `## Page ${clip.page}\n`;
            }
            page = clip.page;
        }

        if(clip.location > location){
            s += `### Location ${clip.location}\n`;
        }
        location = clip.location

        if(clip.clippingType === ClippingType.highlight){
            s += '> ';
        }

        s += `${clip.content}\n\n`;
    }

    return s;

}