"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseClippings = void 0;
const model_1 = require("./model");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
function parseClippings(filePath) {
    var _a, e_1, _b, _c;
    var _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const numberPattern = /\s+(\d+)/;
        const clippingSeparator = '==========';
        const stream = fs.createReadStream(filePath);
        const rl = readline.createInterface(stream);
        var booksByHeader = {};
        let current = new model_1.Clipping();
        let lineNum = 0;
        try {
            for (var _f = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a; _f = true) {
                _c = rl_1_1.value;
                _f = false;
                const line = _c;
                if (!line) {
                    continue;
                }
                if (line === clippingSeparator) {
                    if (!current.header) {
                        continue;
                    } // can't add a clipping if we couldn't extract a header value
                    let book = tryAdd(booksByHeader, current.header, x => new model_1.Book(x));
                    book.clippings.push(current);
                    current = new model_1.Clipping();
                    lineNum = 0;
                    continue;
                }
                switch (lineNum) {
                    case 0:
                        current.header = line;
                        break;
                    case 1:
                        var parts = line.split('|');
                        current.clippingType = parts[0].includes("Note") ? model_1.ClippingType.note : model_1.ClippingType.highlight;
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
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_f && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // sort the clippings by location and remove duplicate highlights
        for (const book of Object.values(booksByHeader)) {
            book.clippings = book.clippings.sort((a, b) => a.location - b.location);
            for (let i = 0; i < book.clippings.length; i++) {
                const curr = book.clippings[i];
                const next = book.clippings[i + 1];
                if (!curr || !next) {
                    continue;
                }
                // when we find two highlight clippings with the same (start) location, delete the shorter one
                if (curr.location === next.location && curr.clippingType === model_1.ClippingType.highlight && next.clippingType === model_1.ClippingType.highlight) {
                    if ((((_d = curr.content) === null || _d === void 0 ? void 0 : _d.length) || 0) < (((_e = next.content) === null || _e === void 0 ? void 0 : _e.length) || 0)) {
                        book.clippings.splice(i, 1);
                        i--; // we need to process this index again, because will now contains the value that was in i+1
                    }
                    else {
                        book.clippings.splice(i + 1, 1);
                    }
                }
            }
        }
        return Object.values(booksByHeader);
    });
}
exports.parseClippings = parseClippings;
function tryAdd(lookup, key, addFn) {
    let t = lookup[key];
    if (!t) {
        t = addFn(key);
        lookup[key] = t;
    }
    return t;
}
