import { Request, Response } from 'express'
import { respJson } from '../../libs/respJson'
import {admin} from '../../models/admin'

export const ListAdmin = async (req:Request, res:Response) => {
    try {
        const result = await admin.find({}).select({password:0})   
        if (result) {
            return respJson(res,200,true,{data:result})
        }else{
            return respJson(res,400,false,{msg:'no hay datos'})
        }
    } catch (error) {
        return respJson(res,500,false,{msg:error})
    }    
} 