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
    title: string | undefined;
    author: string | undefined;
    clippings: Clipping[] = [];

}