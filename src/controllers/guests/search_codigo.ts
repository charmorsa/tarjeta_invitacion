import { Request, Response } from "express";
import { respJson } from "../../libs/respJson";
import { inv } from "../../models/invitados";
import clc from "cli-color";
import { logRes } from "../../models/logs.response";
import { logError } from "../../models/logs.error";
import { logReq } from "../../models/logs.request";

export const SearchCodig = async (req: Request, res: Response) => {
    const codigo: string = req.body.codigo
    const dateRegister = new Date()
    try {        
        await new logReq({user:"Sin Usuario", dateRegister, type:"Request SearchCodig", data:req.body}).save()
        const result = await inv.findOne({ codigo })
        if (!result) return respJson(res, 400, false, { msg: 'No se encontró ningún resultado' })
        await new logRes({user:"Sin Usuario", dateRegister, type:"Response SearchCodig", data:result}).save()
        return respJson(res, 200, true, { msg: result })
    } catch (error) {
        console.error(clc.red('Error, contactese con el administrador', error))
        await new logError({user:"Sin Usuario", dateRegister, type:"Error SearchCodig", data:error}).save()
        return respJson(res, 500, false, { msg: 'Error, contactese con el administrador' })
    }
};
