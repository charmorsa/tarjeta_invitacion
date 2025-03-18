import { Request, Response } from "express"
import { respJson } from "../libs/respJson"

export const homePage =async (req:Request, res:Response) => {
    try {
        return respJson(res,200,true,{msg:'home'})
    } catch (error) {
        return respJson(res,500,false,{msg:error})
    }
}