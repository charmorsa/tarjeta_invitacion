import { Request, Response } from "express";
import { respJson } from "../../libs/respJson";
import { inv } from "../../models/invitados";

export const SearchCodig = async (req: Request, res: Response) => {
    try {
        const codigo: string = req.body.codigo;
        const result = await inv.findOne({ codigo });
        if (result) {
            return respJson(res, 200, true, { msg: result });
        } else {
            return respJson(res, 400, false, { msg: 'No se encontró ningún resultado' });
        }
    } catch (error) {
        return respJson(res, 500, false, { msg: 'Error en el servidor' });
    }
};
