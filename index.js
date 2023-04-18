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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs = require("fs");
function createReadmeFromRepo(repoUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var response, contents, readmeContent_LINKS, readmeContent_BASH, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("https://api.github.com/repos/".concat(repoUrl, "/contents"))];
                case 1:
                    response = _b.sent();
                    contents = response.data;
                    return [4 /*yield*/, generateReadmeContent_LINKS(contents)];
                case 2:
                    readmeContent_LINKS = _b.sent();
                    _a = '```bash\n';
                    return [4 /*yield*/, generateReadmeContent_BASH(contents, "")];
                case 3:
                    readmeContent_BASH = _a + (_b.sent()) + '```';
                    // Write readme content to a local README.md file
                    fs.writeFileSync('README_LINKS.md', readmeContent_LINKS);
                    fs.writeFileSync('README_BASH.md', readmeContent_BASH);
                    console.log('README.md files created successfully!');
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.error('Failed to create README.md files:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function generateReadmeContent_LINKS(contents, depth) {
    if (depth === void 0) { depth = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var readmeContent, _i, contents_1, content, type, name_1, path, indent, response, dirContents, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    readmeContent = '';
                    _i = 0, contents_1 = contents;
                    _b.label = 1;
                case 1:
                    if (!(_i < contents_1.length)) return [3 /*break*/, 6];
                    content = contents_1[_i];
                    type = content.type, name_1 = content.name, path = content.path;
                    indent = '  '.repeat(depth);
                    if (!(type === 'file')) return [3 /*break*/, 2];
                    // Add file item to readme content
                    readmeContent += "".concat(indent, "- [").concat(name_1, "](").concat(path, ")\n");
                    return [3 /*break*/, 5];
                case 2:
                    if (!(type === 'dir')) return [3 /*break*/, 5];
                    // Add directory item to readme content
                    readmeContent += "".concat(indent, "- ").concat(name_1, "/\n");
                    return [4 /*yield*/, axios_1.default.get("https://api.github.com/repos/".concat(repoUrl, "/contents/").concat(path))];
                case 3:
                    response = _b.sent();
                    dirContents = response.data;
                    _a = readmeContent;
                    return [4 /*yield*/, generateReadmeContent_LINKS(dirContents, depth + 1)];
                case 4:
                    readmeContent = _a + _b.sent();
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, readmeContent];
            }
        });
    });
}
function generateReadmeContent_BASH(contents, prefix) {
    return __awaiter(this, void 0, void 0, function () {
        var readmeContent, i, _a, type, name_2, path, isLast, indent, response, dirContents, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    readmeContent = '';
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < contents.length)) return [3 /*break*/, 6];
                    _a = contents[i], type = _a.type, name_2 = _a.name, path = _a.path;
                    isLast = i === contents.length - 1;
                    indent = prefix + (isLast ? '└── ' : '├── ');
                    if (!(type === 'file')) return [3 /*break*/, 2];
                    // Add file item to readme content
                    readmeContent += "".concat(indent).concat(name_2, "\n");
                    return [3 /*break*/, 5];
                case 2:
                    if (!(type === 'dir')) return [3 /*break*/, 5];
                    // Add directory item to readme content
                    readmeContent += "".concat(indent).concat(name_2, "/\n");
                    return [4 /*yield*/, axios_1.default.get("https://api.github.com/repos/".concat(repoUrl, "/contents/").concat(path))];
                case 3:
                    response = _c.sent();
                    dirContents = response.data;
                    _b = readmeContent;
                    return [4 /*yield*/, generateReadmeContent_BASH(dirContents, prefix + (isLast ? '   ' : '│  '))];
                case 4:
                    readmeContent = _b + _c.sent(); // Adjust the prefix for nested contents
                    _c.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, readmeContent];
            }
        });
    });
}
// Example usage
var repoUrl = 'microsoft/vscode';
createReadmeFromRepo(repoUrl);
