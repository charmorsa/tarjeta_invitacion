import { Request, Response } from "express"
import { respJson } from "../../libs/respJson"
import bcrypt from 'bcrypt'
import {admin} from "../../models/admin"
import clc from "cli-color"
import { logReq } from "../../models/logs.request"
import { logRes } from "../../models/logs.response"
import { logError } from "../../models/logs.error"

export const AddAdmin =async (req:Request, res:Response) => {
    let user:string = req.body.user
    let password:string = req.body.password
    let name:string = req.body.name
    let dateRegister = new Date()
    try {
        await new logReq({user, dateRegister, type:"Request AddAdmin", data:req.body}).save()

        const ex = await admin.exists({user, name})
        if (ex) return respJson(res,400,false,{msg:'Usuario Existente'})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const userDB = await new admin({user, password:hash, name}).save()

        if(!userDB) return respJson(res,400,false,{msg:'## Error al crear un usuario nuevo ##'});

        await new logRes({user, dateRegister, type:"Response AddAdmin", data:userDB}).save()

        return respJson(res,200,true,{data:'Exito al Cargar', userDB})
    } catch (error) {
        console.error(clc.red('Error API AddAdmin ', error))
        await new logError({user:req.body.jwt.id, dateRegister, type:"Error AddAdmin", data:error}).save()
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}