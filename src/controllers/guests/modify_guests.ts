import { Request, Response } from "express";
import { respJson } from "../../libs/respJson";
import { inv } from "../../models/invitados";
import clc from "cli-color";
import { sendEmail } from "../../config/send.email.controller";

export const ModifyGuests = async (req: Request, res: Response) => {
    try {
        const { codigo, estado } = req.body

        const result = await inv.findOneAndUpdate(
            { codigo },
            { estado }
        );

        if (!result) return respJson(res, 400, false, { msg: 'No se encontró ningún resultado' })

        let text = `Se ha modificado el estado de la invitacion a la Boda: "Walrus-Duck".
        el codigo de invitado es :${codigo}
        paso a estado: ${estado}
        gracias por confirmar...`
        let type = 'Boda: Walrus-Duck'
        let email = 'natubucher713@gmail.com'
        await sendEmail(email, type, text)

        return respJson(res, 200, true, { msg: 'Estado del familiar actualizado exitosamente' })
    } catch (error) {
        console.error(clc.red('Error API ModifyGuests ', error))
        return respJson(res, 500, false, { msg:'Error, contactese con el administrador'})
    }
};
