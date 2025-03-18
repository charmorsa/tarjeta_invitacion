import { Request, Response } from "express"
import { respJson } from "../../libs/respJson"
import { inv } from "../../models/invitados"
import clc from "cli-color"
import { generateCode } from "../../config/generate.codigo.controller"
import { logReq } from "../../models/logs.request"
import { logRes } from "../../models/logs.response"
import { logError } from "../../models/logs.error"

export const AddFamily = async (req:Request, res:Response) => {
    const codigo:string= req.body.codigo
    const familiar = req.body.familiar
    const code:string = generateCode()
    const dateRegister = new Date()
    try {
        await new logReq({user:req.body.jwt.id, dateRegister, type:"Request AddFamily", data:req.body}).save()
        
        const result = await inv.findOne({codigo})
        if(!result) return respJson(res,400,false,{msg:'No se encontro familiar'})
        const family:any = result.familiar
        for (let i = 0; i < family.length; i++) {
            if(familiar.nombre==family[i].nombre && familiar.apellido==family[i].apellido) return respJson(res,400,false,{msg:'Familiar ya registrado'})
        }

        familiar.codigo = code
        const up = await inv.findByIdAndUpdate(
            { _id: result._id },
            { $push: { familiar } }
        )
        if(!up) return respJson(res,400,false,{msg:'Error al agregar familiar'})
        
        await new logRes({user:req.body.jwt.id, dateRegister, type:"Response AddFamily", data:code}).save()
        return respJson(res,200,true,{datos:'exito al cargar familiar'})
    } catch (error) {
        console.error(clc.red('Error API AddFamily', error))
        await new logError({user:req.body.jwt.id, dateRegister, type:"Error AddFamily", data:error}).save()
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}