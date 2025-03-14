import { Request, Response } from "express";
import { respJson } from "../../libs/respJson";
import { inv } from "../../models/invitados";
import clc from "cli-color";

export const SearchGuests = async (req: Request, res: Response) => {
    try {
        const apellido: string = req.body.apellido
        const result = await inv.findOne({ apellido }).select({_id:0})
        if (!result) return respJson(res, 400, false, { msg: 'No se encontró ningún resultado' })
        
        return respJson(res, 200, true, { msg: result })
    } catch (error) {
        console.error(clc.red('Error API SearchGuests ',error))
        return respJson(res, 500, false, { msg: 'Error, contactese con el administrador' })
    }
};
