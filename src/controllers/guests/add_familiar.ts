import { Request, Response } from "express"
import { respJson } from "../../libs/respJson"
import { inv } from "../../models/invitados"
export const AddFamili = async (req:Request, res:Response) => {
    try {
        const jefe_nombre :string= req.body.jefe_nombre
        const jefe_ape:string = req.body.jefe_ape
        const familiar = req.body.familiar
        const result:any = await inv.find({nombre:jefe_nombre, apellido:jefe_ape}).select({_id:1})
        if(result){
            const up = await inv.findByIdAndUpdate(
                result[0]._id,
                { $push: { familiar: familiar } },
                { new: true }
            )
            return respJson(res,200,true,{datos:'exito al cargar familiar'})
        }
    } catch (error) {
        return respJson(res,500,false,{msg:error})
    }
}