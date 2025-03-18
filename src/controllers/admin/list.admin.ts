import { Request, Response } from 'express'
import { respJson } from '../../libs/respJson'
import {admin} from '../../models/admin'
import clc from 'cli-color'
import { logRes } from "../../models/logs.response"
import { logError } from "../../models/logs.error"

export const ListAdmin = async (req:Request, res:Response) => {
    const dateRegister = new Date()
    try {
        const result = await admin.find({}).select({password:0})
        if (result.length == 0) return respJson(res,400,false,{msg:'no hay datos'})

        await new logRes({user:req.body.jwt.id, dateRegister, type:"Response ListAdmin", data:result}).save()

        return respJson(res,200,true,{data:result})
    } catch (error) {
        console.error(clc.red('Error API ListAdmin',error))
        await new logError({user:req.body.jwt.id, dateRegister, type:"Error ListAdmin", data:error}).save()
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }    
} 