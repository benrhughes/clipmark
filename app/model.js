"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.ClippingType = exports.Clipping = void 0;
class Clipping {
    constructor() {
        this.location = 0;
    }
}
exports.Clipping = Clipping;
var ClippingType;
(function (ClippingType) {
    ClippingType[ClippingType["highlight"] = 1] = "highlight";
    ClippingType[ClippingType["note"] = 2] = "note";
})(ClippingType || (exports.ClippingType = ClippingType = {}));
class Book {
    constructor(header) {
        this.clippings = [];
        const match = header.match(Book.titleAuthorPattern);
        if (match) {
            this.title = match[1].trim();
            this.author = match[2].trim();
        }
    }
}
exports.Book = Book;
Book.titleAuthorPattern = /^(.*?)\s*\(([^)]+)\)$/;
