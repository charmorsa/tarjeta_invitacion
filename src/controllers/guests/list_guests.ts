import {Request, Response} from 'express'
import { respJson } from '../../libs/respJson'
import {inv} from '../../models/invitados'
import clc from 'cli-color'
import { logRes } from '../../models/logs.response'
import { logError } from '../../models/logs.error'

export const ListGuests =async (req:Request, res:Response) => {
    const dateRegister = new Date()
    try {
        const result = await inv.find({})
        if (result.length == 0) return respJson(res,400,false,{msg:'Error en la Consulta a la base de datos'})

        await new logRes({user:req.body.jwt.id, dateRegister, type:"Response ListGuests", data:result}).save()
        return respJson(res,200,true,{msg:result})
    } catch (error) {
        console.error(clc.red('Error API ListGuests', error))
        await new logError({user:req.body.jwt.id, dateRegister, type:"Error ListGuests", data:error}).save()
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}