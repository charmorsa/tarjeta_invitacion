import { Request, Response } from "express"
import { respJson } from "../../libs/respJson"
import bcrypt from 'bcrypt'
import {admin} from "../../models/admin"
import clc from "cli-color"

export const AddAdmin =async (req:Request, res:Response) => {
    try {
        let user:string = req.body.user
        let password:string = req.body.password
        let name:string = req.body.name

        const ex = await admin.exists({user, name})
        if (ex) return respJson(res,400,false,{msg:'Usuario Existente'})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const userDB = await new admin({user, password:hash, name}).save()

        if(!userDB) return respJson(res,400,false,{msg:'## Error al crear un usuario nuevo ##'});
        return respJson(res,200,true,{data:'Exito al Cargar', userDB})
    } catch (error) {
        console.error(clc.red('Error API AddAdmin ', error))
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}