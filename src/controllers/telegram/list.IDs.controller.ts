import { Request, Response } from "express"
import { chatIds } from "./send.telegram.controller"
import { respJson } from "../../libs/respJson"

export const listaIDS =async (req:Request, res:Response) => {
    try {
        return respJson(res,200,true,{msg:chatIds})
    } catch (error) {
        return respJson(res,500,false,{msg:'Error, constactese con el administrador'})
    }
}