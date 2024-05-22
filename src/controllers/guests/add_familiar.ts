import { Request, Response } from "express"
import { respJson } from "../../libs/respJson"
import { inv } from "../../models/invitados"
import clc from "cli-color"
import { generateCode } from "../../controllers/generate.codigo.controller"
export const AddFamili = async (req:Request, res:Response) => {
    try {
        const codigo:string= req.body.codigo
        const familiar = req.body.familiar
        const code:string = generateCode()

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

        return respJson(res,200,true,{datos:'exito al cargar familiar', codigo: code})
    } catch (error) {
        console.error(clc.red('Error, contactese con el administrador', error))
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}