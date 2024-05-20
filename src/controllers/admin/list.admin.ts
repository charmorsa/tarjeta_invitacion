import { Request, Response } from 'express'
import { respJson } from '../../libs/respJson'
import {admin} from '../../models/admin'
import clc from 'cli-color'

export const ListAdmin = async (req:Request, res:Response) => {
    try {
        const result = await admin.find({}).select({password:0})  
        if (result.length == 0) return respJson(res,400,false,{msg:'no hay datos'})
        return respJson(res,200,true,{data:result})
    } catch (error) {
        console.error(clc.red('Error, contactese con el administrador',error))
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }    
} 