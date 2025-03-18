import { Request, Response } from "express";
import { respJson } from "../../libs/respJson";
import { inv } from "../../models/invitados";
import clc from "cli-color";
import { logReq } from "../../models/logs.request";
import { logRes } from "../../models/logs.response";
import { logError } from "../../models/logs.error";

export const SearchGuests = async (req: Request, res: Response) => {
    const apellido: string = req.body.apellido
    const dateRegister = new Date()
    try {
        await new logReq({user:req.body.jwt.id, dateRegister, type:"Request SearchGuests", data:req.body}).save()
        
        const result = await inv.findOne({ apellido }).select({_id:0})
        if (!result) return respJson(res, 400, false, { msg: 'No se encontró ningún resultado' })
        
        await new logRes({user:req.body.jwt.id, dateRegister, type:"Response SearchGuests", data:result}).save()
        return respJson(res, 200, true, { msg: result })
    } catch (error) {
        console.error(clc.red('Error API SearchGuests ',error))
        await new logError({user:req.body.jwt.id, dateRegister, type:"Error SearchGuests", data:error}).save()
        return respJson(res, 500, false, { msg: 'Error, contactese con el administrador' })
    }
};
