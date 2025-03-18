import { Request, Response } from 'express'
import { respJson } from '../../libs/respJson'
import { inv } from '../../models/invitados'
import clc from 'cli-color'
import { generateCode } from '../../config/generate.codigo.controller'
import { logRes } from '../../models/logs.response'
import { logError } from '../../models/logs.error'
import { logReq } from '../../models/logs.request'

export const AddGuests =async (req:Request, res:Response) => {
    const codigo:string = generateCode()
    const nombre:string = req.body.nombre
    const apellido:string = req.body.apellido
    const dateRegister = new Date()
    try {
        await new logReq({user:req.body.jwt.id, dateRegister, type:"Request AddGuests", data:req.body}).save()
        const ex = await inv.exists({nombre, apellido}).select({_id:0})
        if (ex) return respJson(res,400,false,{msg:'Invitado ya existe'})
        
        const result = await new inv({codigo, nombre, apellido}).save()
        if(!result) return respJson(res,400,false,{msg:'Error al cargar Invitado'})
        
        await new logRes({user:req.body.jwt.id, dateRegister, type:"Response AddGuests", data:codigo}).save()
        return respJson(res,200,true,{msg:'Carga exitosa', codigo})
    } catch (error) {
        console.error(clc.red('Error API AddGuests ', error))
        await new logError({user:req.body.jwt.id, dateRegister, type:"Error AddGuests", data:error}).save()
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}