"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.respJson = void 0;
var respJson = function (res, status, ok, others) { return res.status(status).json(__assign({ ok: ok, status: status }, others)); };
exports.respJson = respJson;
//# sourceMappingURL=respJson.js.map