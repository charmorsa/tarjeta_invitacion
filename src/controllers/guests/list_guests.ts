import {Request, Response} from 'express'
import { respJson } from '../../libs/respJson'
import {inv} from '../../models/invitados'
import clc from 'cli-color'

export const ListGuests =async (req:Request, res:Response) => {
    try {
        const result = await inv.find({})
        if (result.length == 0) return respJson(res,400,false,{msg:'Error en la Consulta a la base de datos'})
        
        return respJson(res,200,true,{msg:result})
    } catch (error) {
        console.error(clc.red('Error API ListGuests', error))
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}