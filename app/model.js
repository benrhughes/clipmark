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
    dateString() {
        const first = this.clippings[0].createdDate;
        const last = this.clippings[this.clippings.length - 1].createdDate;
        let val = '';
        if (first) {
            val = `*${first.toLocaleDateString('en-GB')}`;
        }
        if (first && last) {
            val += ` - ${last.toLocaleDateString('en-GB')}*`;
        }
        else if (last) {
            val = `*${last.toLocaleDateString('en-GB')}*`;
        }
        else {
            val += '*';
        }
        return val;
    }
    toMarkdown() {
        var s = `# ${this.title} - ${this.author}\n\n${this.dateString()}\n\n`;
        let page = 0;
        let location = 0;
        for (const clip of this.clippings) {
            if (clip.page && clip.page > 0) {
                if (clip.page > page) {
                    s += `## Page ${clip.page}\n`;
                }
                page = clip.page;
            }
            if (clip.location > location) {
                s += `### Location ${clip.location}\n`;
            }
            location = clip.location;
            if (clip.clippingType === ClippingType.highlight) {
                s += '> ';
            }
            s += `${clip.content}\n\n`;
        }
        return s;
    }
}
exports.Book = Book;
Book.titleAuthorPattern = /^(.*?)\s*\(([^)]+)\)$/;
