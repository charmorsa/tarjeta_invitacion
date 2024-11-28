export function generateCode() {
    const fechaActual = new Date()
    const dia = fechaActual.getDay()
    const horas = fechaActual.getHours()
    const minutos = fechaActual.getMinutes()
    const segundos = fechaActual.getSeconds()
    const mili = fechaActual.getMilliseconds()

    const fecha = Number(`${dia}${horas}${minutos}${segundos}${mili}`)
    const code = convertirANumeroAlfanumerico(fecha)
    return code
}


function convertirANumeroAlfanumerico(valor: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const base = caracteres.length;
    let resultado = '';
    
    do {
        resultado = caracteres.charAt(valor % base) + resultado;
        valor = Math.floor(valor / base);
    } while (valor > 0);
    
    return resultado;
}
