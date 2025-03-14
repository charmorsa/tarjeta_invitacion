import { Request, Response } from "express";
import { respJson } from "../../libs/respJson";
import { inv } from "../../models/invitados";
import clc from "cli-color";
import { sendMessage } from "../../config/rabbit/sent.message";

export const ModifyGuests = async (req: Request, res: Response) => {
    try {
        const { codigo, estado } = req.body

        const result = await inv.findOneAndUpdate(
            { codigo },
            { estado }
        );

        if (!result) return respJson(res, 400, false, { msg: 'No se encontró ningún resultado' })

        let text = [
            `Se ha modificado el estado de la invitacion a la Boda: "Walrus-Duck"`,
            `El codigo de invitado es :${codigo}`,
            `Paso a estado: ${estado}`,
            `Gracias por confirmar...`,
            `Que tenga buen día`
        ]
        let type = 'Boda: Walrus-Duck'
        let email = '10.0charly@gmail.com'

        let message = `${email}_${type}_${text}`
        await sendMessage('cola', message)

        return respJson(res, 200, true, { msg: 'Estado del familiar actualizado exitosamente' })
    } catch (error) {
        console.error(clc.red('Error API ModifyGuests ', error))
        return respJson(res, 500, false, { msg:'Error, contactese con el administrador'})
    }
};
