import { Request, Response } from "express"
import { respJson } from "../libs/respJson"
import { inv } from "../models/invitados"
import clc from "cli-color"

export const messGuests =async (req:Request, res:Response) => {
    try {
        const code:string = req.body.codigo
        const datos = await inv.findOne({codigo:code})
        if(!datos) return respJson(res,400,false,{msg:'No se encontro invitado'})
        const mess = `🎉 ¡Hola ${datos.nombre}! 🎉

        ¡Nos alegra mucho anunciarte que nos vamos a casar! 💍✨
        
        Queremos compartir este momento especial con vos, por eso te invitamos a nuestra boda.
        
        🗓 Fecha: 27/12
        🕒 Hora: 19:30hs
        📍 Lugar de la Ceremonia: Quinta La Juliana
        
        
        Para tu comodidad, por favor utiliza el Código de Invitación para confirmar tu asistencia : ${datos.codigo}
        
        Confirma tu asistencia antes del 01/11 Entrando en el siguiente link: https://nuestra-boda-natuycharly.web.app/
        
        Por cualquier duda nos pueden mandar un mensaje
        
        Natu: 376-4119665
        Charly: 376-4814854.
        
        
        Estamos emocionados de celebrar este día tan especial con vos. ¡Esperamos verte allí!
        
        Con cariño,
        Natu y Charly`
        return respJson(res,200,true,{msg:mess})
    } catch (error) {
        console.error(clc.red('Error mssGuests', error))
        return respJson(res,500,false,{msg:error})
    }
}
