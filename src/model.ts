export class Clipping {
    header: string | undefined;
    clippingType: ClippingType | undefined;
    page: number | undefined;
    location: number = 0;
    content: string | undefined;
    createdDate: Date | undefined
}

export enum ClippingType {
    highlight = 1,
    note = 2
}

export class Book {
    static titleAuthorPattern = /^(.*?)\s*\(([^)]+)\)$/;
    title: string | undefined;
    author: string | undefined;
    clippings: Clipping[] = [];

    constructor(header: string){
        const match = header.match(Book.titleAuthorPattern);
        if (match) {
            this.title = match[1].trim();
            this.author = match[2].trim();
        }
    }
}