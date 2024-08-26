"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respJson = void 0;
const respJson = (res, status, ok, others) => res.status(status).json(Object.assign({ ok, status }, others));
exports.respJson = respJson;
//# sourceMappingURL=respJson.js.map