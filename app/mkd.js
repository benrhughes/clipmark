"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMarkdown = void 0;
const model_1 = require("./model");
function toMarkdown(book) {
    var s = `# ${book.title} - ${book.author}\n`;
    for (const clip of book.clippings) {
        if (clip.page && clip.page > 0) {
            s += `## Page ${clip.page}\n`;
        }
        s += `### Location ${clip.location}\n`;
        if (clip.clippingType === model_1.ClippingType.highlight) {
            s += '> ';
        }
        s += `${clip.content}\n\n`;
    }
    return s;
}
exports.toMarkdown = toMarkdown;
