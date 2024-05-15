import { Request, Response } from "express";
import { inv } from "../../models/invitados";
import { respJson } from "../../libs/respJson";

export const ModificarEstadoFamiliar = async (req: Request, res: Response) => {
  const { codigo, nombre, estado } = req.body;

  try {
    // Actualizar el estado del familiar dentro del invitado en la base de datos
    const result = await inv.findOneAndUpdate(
      { codigo, "familiar.nombre": nombre }, // Condición de búsqueda
      { $set: { "familiar.$.estado": estado } }, // Actualización del estado del familiar
      { new: true } // Devolver el documento actualizado
    );

    // Verificar si se encontró y actualizó el documento
    if (!result) {
      return res.status(404).json({ error: "Invitado o familiar no encontrado" });
    }

    res.json({ mensaje: "Estado del familiar actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar estado del familiar:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
