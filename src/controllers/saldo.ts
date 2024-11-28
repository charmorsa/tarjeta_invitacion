import { Request,Response } from "express"
import { respJson } from "../libs/respJson"

export const saldos = async (req:Request, res:Response) => {
    try {
        const current:number = 4000
        const amount:number = req.body.amount
        if(amount<1) return respJson(res,400,false,{msg:'poco'})
        if(amount>current) return respJson(res,400,false,{msg:'incorrecto'})
        console.log(amount, typeof amount, current, typeof current, current+amount)
        return respJson(res,200,true,{msg:'acredito'})
    } catch (error) {
        console.log('err', error)
        return respJson(res,500,false,{msg:'err'})
    }
}