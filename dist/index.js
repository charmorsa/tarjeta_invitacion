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
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server/server"));
const mongoDB_1 = __importDefault(require("./databases/mongoDB"));
const index_1 = require("./routes/index");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cli_color_1 = __importDefault(require("cli-color"));
dotenv_1.default.config();
const puerto = Number(process.env.PORT);
const server = server_1.default.init(puerto);
const mb = String(process.env.MONGODB_URI);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoDB_1.default)(mb);
        server.app.use((0, cors_1.default)());
        server.app.use(express_1.default.json());
        server.app.use('/', index_1.index);
        server.start(() => {
            console.log(cli_color_1.default.blue(' ============================================ ')),
                console.log(cli_color_1.default.yellow(` ======   Server Start at Port :${puerto}   ====== `)),
                console.log(cli_color_1.default.blue(' ============================================ '));
        });
    });
}
main();
//# sourceMappingURL=index.js.map