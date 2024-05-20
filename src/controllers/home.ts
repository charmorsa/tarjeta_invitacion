import { Request, Response } from "express"
import { respJson } from "../libs/respJson"
import { sendEmail } from "./send.email.controller"

export const homePage =async (req:Request, res:Response) => {
    try {

        let text = ``
        let type = 'Boda: Walrus-Duck'
        let email = 'natubucher713@gmail.com'
        sendEmail(email, type, text)
        return respJson(res,200,true,{msg:'home'})
    } catch (error) {
        return respJson(res,500,false,{msg:error})
    }
}