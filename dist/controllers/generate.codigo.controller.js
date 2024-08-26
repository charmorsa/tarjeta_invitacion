"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = void 0;
function generateCode() {
    var fechaActual = new Date();
    var horas = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    var segundos = fechaActual.getSeconds();
    var mili = fechaActual.getMilliseconds();
    var fecha = String("".concat(horas.toString(16)).concat(minutos.toString(16)).concat(segundos.toString(16)).concat(mili.toString(16)));
    return fecha;
}
exports.generateCode = generateCode;
//# sourceMappingURL=generate.codigo.controller.js.map