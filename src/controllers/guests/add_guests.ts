import { Request, Response } from 'express'
import { respJson } from '../../libs/respJson'
import { inv } from '../../models/invitados'
import clc from 'cli-color'
import { generateCode } from '../../config/generate.codigo.controller'

export const AddGuests =async (req:Request, res:Response) => {
    try {
        const codigo:string = generateCode()
        const nombre:string = req.body.nombre
        const apellido:string = req.body.apellido

        const ex = await inv.exists({nombre, apellido}).select({_id:0})
        if (ex) return respJson(res,400,false,{msg:'Invitado ya existe'})

        const result = await new inv({codigo, nombre, apellido}).save()
        if(!result) return respJson(res,400,false,{msg:'Error al cargar Invitado'})

        return respJson(res,200,true,{msg:'Carga exitosa', codigo})
    } catch (error) {
        console.error(clc.red('Error API AddGuests ', error))
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}