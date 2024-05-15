import { Request, Response } from "express";
import { respJson } from "../../libs/respJson";
import { inv } from "../../models/invitados";

export const Modifyguests = async (req: Request, res: Response) => {
    try {
        const { codigo, estado } = req.body;

        // Validar el cuerpo de la solicitud
        if (typeof codigo !== 'string' || typeof estado !== 'boolean') {
            return respJson(res, 400, false, { msg: 'Datos de entrada no válidos' });
        }

        const result = await inv.findOneAndUpdate(
            { codigo },
            { $set: { estado } },
            { new: true }
        );

        if (result) {
            return respJson(res, 200, true, { msg: result });
        } else {
            return respJson(res, 400, false, { msg: 'No se encontró ningún resultado' });
        }
    } catch (error) {
        return respJson(res, 500, false, { msg: 'Error en el servidor' });
    }
};

