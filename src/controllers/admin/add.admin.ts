import { Request, Response } from "express"
import { respJson } from "../../libs/respJson"
import bcrypt from 'bcrypt'
import {admin} from "../../models/admin"

export const AddAdmin =async (req:Request, res:Response) => {
    try {
        let user:string = String(req.body.user)
        let password:string = String(req.body.password)
        let name:string = String(req.body.name)

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const userDB = await new admin({user, password:hash, name}).save()

        if(!userDB) return respJson(res,400,false,{msg:'## Error al crear un usuario nuevo ##'});
        return respJson(res,200,true,{data:'Exito al Cargar', userDB})
    } catch (error) {
        return respJson(res,500,false,{msg:error})
    }
}