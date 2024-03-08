import {Request, Response} from 'express'
import { respJson } from '../../libs/respJson'
import {inv} from '../../models/invitados'

export const AddGuests =async (req:Request, res:Response) => {
    try {
        const nombre:string = String(req.body.nombre)
        const apellido:string = String(req.body.apellido)
        const result = await new inv({nombre, apellido}).save()
        if(result){
            return respJson(res,200,true,{msg:'Carga exitosa'})
        }else{
            return respJson(res,400,false,{msg:'Error al cargar Invitado'})
        }
    } catch (error) {
        return respJson(res,500,false,{msg:error})
    }
}