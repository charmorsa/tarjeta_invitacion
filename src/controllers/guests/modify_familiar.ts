import { Request, Response } from "express";
import { inv } from "../../models/invitados";
import { respJson } from "../../libs/respJson";
import clc from "cli-color";
import { sendEmail } from "../send.email.controller";

export const ModificarEstadoFamiliar = async (req: Request, res: Response) => {
  try {
    const { codigo, estado } = req.body
    const result = await inv.findOneAndUpdate(
      { "familiar.codigo":codigo },
      { "familiar.$.estado": estado }
    );

    if (!result) return respJson(res,400,false,{ msg: "Invitado o familiar no encontrado" })
    
    let text = `Se ha modificado el estado de la invitacion a la Boda: "Walrus-Duck".
    el codigo de invitado es :${codigo}
    paso a estado: ${estado}
    gracias por confirmar...`
    let type = 'Boda: Walrus-Duck'
    let email = 'natubucher713@gmail.com'
    sendEmail(email, type, text)
    return respJson(res,200,true,{ mensaje: "Estado del familiar actualizado exitosamente" })
  } catch (error) {
    console.error(clc.red("Error, contactese con el administrador", error))
    return respJson(res,500,false,{ msg: "Error, contactese con el administrador" })
  }
};
