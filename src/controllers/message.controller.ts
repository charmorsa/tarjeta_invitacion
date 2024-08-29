import { Request, Response } from "express"
import { respJson } from "../libs/respJson"
import { inv } from "../models/invitados"

export const messGuests =async (req:Request, res:Response) => {
    try {
        const code = req.body.codigo
        const datos = await inv.findOne({codigo:code})
        if(!datos) return respJson(res,400,false,{msg:'No se encontro invitado'})
        const mess = `🎉 ¡Hola ${datos.nombre}! 🎉<br/><br/>
        ¡Nos alegra mucho anunciarte que nos vamos a casar! 💍✨<br/><br/>
        Queremos compartir este momento especial con vos, por eso te invitamos a nuestra boda.<br/><br/>
        🗓 Fecha: 27/12<br/>
        🕒 Hora: 19:30hs<br/>
        📍 Lugar de la Ceremonia: Quinta La Juliana<br/><br/>
        Para tu comodidad, por favor utiliza el Código de Invitación para confirmar tu asistencia : ${datos.codigo}<br/><br/>
        Confirma tu asistencia antes del 01/11 Entrando en el siguiente link: https://nuestra-boda-natuycharly.web.app/<br/><br/>
        Por cualquier duda nos pueden mandar un mensaje<br/><br/>
        Natu: 376-4119665<br/>
        Charly: 376-4814854.<br/><br/>
        Estamos emocionados de celebrar este día tan especial con vos. ¡Esperamos verte allí!<br/><br/>
        Con cariño,<br/>
        Natu y Charly`
        return respJson(res,200,true,{msg:mess})
    } catch (error) {
        console.log(error)
        return respJson(res,500,false,{msg:error})
    }
}
