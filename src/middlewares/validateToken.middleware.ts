import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';

declare var process : { env: { JWT_SECRET:string } }

export const validateJwt = async (req: Request, res:Response, next: CallableFunction) => {
    const token = req.header('TOKEN');
    if(!token) return res.status(401).json({ok: false, status: 401, msg: 'No hay Token en la Petición'})
    try {
        const {id, name, last_name }: any = jwt.verify(token, process.env.JWT_SECRET, {algorithms: ["HS256"]})
        req.body.jwt = {id, name, last_name }

    } catch (err) { return res.status(401).json({ ok: false, status: 401, msg: 'Token Invalido' }); }
    next()
}
