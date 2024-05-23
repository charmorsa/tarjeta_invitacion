export function generateCode() {
    const fechaActual = new Date();
    const horas = fechaActual.getHours()
    const minutos = fechaActual.getMinutes()
    const segundos = fechaActual.getSeconds()
    const mili = fechaActual.getMilliseconds()

    const fecha = String(`${horas.toString(16)}${minutos.toString(16)}${segundos.toString(16)}${ mili.toString(16)}`)
    return fecha
}
