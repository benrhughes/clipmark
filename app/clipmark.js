"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const parser_1 = require("./parser");
const fs = require('fs').promises;
const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g;
const outputDir = 'clippings';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.argv.length <= 2) {
            console.log("Usage: node " + __filename + " path/to/clippings.txt");
            process.exit(-1);
        }
        const inputFile = process.argv[2];
        var books = yield (0, parser_1.parseClippings)(inputFile);
        yield fs.mkdir(outputDir, { recursive: true });
        for (const book of books) {
            const mkd = book.toMarkdown();
            const fileName = `${book.author} - ${book.title}.md`.replace(invalidChars, '');
            const filePath = path_1.default.join(outputDir, fileName);
            yield fs.writeFile(filePath, mkd, 'utf8');
            console.log(`Wrote ${filePath}`);
        }
    });
}
main();
