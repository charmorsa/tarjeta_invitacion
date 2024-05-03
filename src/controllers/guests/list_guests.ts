import {Request, Response} from 'express'
import { respJson } from '../../libs/respJson'
import {inv} from '../../models/invitados'

export const ListGuests =async (req:Request, res:Response) => {
    try {
        const result = await inv.find({estado:true})
        if (result){
            return respJson(res,200,true,{msg:result})
        }else{
            return respJson(res,400,false,{msg:'Error en la Consulta a la base de datos'})
        }
    } catch (error) {
        return respJson(res,500,false,{msg:error})
    }
}