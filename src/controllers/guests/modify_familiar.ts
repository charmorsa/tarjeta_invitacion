import { Request, Response } from "express";
import { inv } from "../../models/invitados";
import { respJson } from "../../libs/respJson";
import clc from "cli-color";
import { sendMessage } from "../../config/rabbit/sent.message";

export const ModStateFamily = async (req: Request, res: Response) => {
  try {
    const { codigo, estado } = req.body
    const result = await inv.findOneAndUpdate(
      { "familiar.codigo":codigo },
      { "familiar.$.estado": estado }
    );

    if (!result) return respJson(res,400,false,{ msg: "Invitado o familiar no encontrado" })
    
    let text = [
      `Se ha modificado el estado de la invitacion a la Boda: "Walrus-Duck".`,
      `El codigo de invitado es :${codigo}`,
      `Paso a estado: ${estado}`,
      `Gracias por confirmar...`,
      `Que tenga buen día.`
    ]
    let type = 'Boda: Walrus-Duck'
    let email = 'natubucher713@gmail.com'
    let message = `${email}_${type}_${text}`
    
    await sendMessage('cola', message)
    return respJson(res,200,true,{ mensaje: "Estado del familiar actualizado exitosamente" })
  } catch (error) {
    console.error(clc.red("Error API ModStateFamily ", error))
    return respJson(res,500,false,{ msg: "Error, contactese con el administrador" })
  }
};
