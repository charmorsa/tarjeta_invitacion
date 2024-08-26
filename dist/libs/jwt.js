"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateJWT = function (user) {
    return new Promise(function (res, rej) {
        jsonwebtoken_1.default.sign({ id: user._id, name: user.name, last_name: user.last_name, admin: user.admin }, "%i7PchH4ka3Lf%2h&A*PK@$qLG*^Ç¨ç´213`+2+t´çñfç´FN7AqzXC^R5q#Qt8jJqVXvcI@Kuo5C4^g4mT2Kt#Wyu%H4$", { expiresIn: '24h', algorithm: 'HS256' }, function (err, token) {
            if (err)
                return rej('Token Not Generated');
            else
                return res(token);
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=jwt.js.map