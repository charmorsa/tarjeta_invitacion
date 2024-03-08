import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { respJson } from "../libs/respJson"
import {admin} from "../models/admin"
import {generateJWT} from '../libs/jwt'

export const loginPage =async (req:Request, res:Response) => {
    try {
        const { user, password } = req.body;
        const userSearch: any = await admin.findOne({ user })

        if (!userSearch) return res.status(400).json({ ok: false, status: 500, msg: 'Usuario no Existe'}) 
        if(!await bcrypt.compare(password, userSearch.password)) return res.status(401).json({ ok: false, status: 500, msg: 'Contraseña no Valida'})

        const token = await generateJWT(userSearch)
        
        if(!token) return res.status(401).json({ ok: false, msg: 'Token no Generado' }) 

        return res.status(200).json({ ok: true, token: token, user: {id: userSearch._id, name: userSearch.name, dni: userSearch.dni, state: userSearch.state} })
    } catch (error) {
        return respJson(res,500,false,{msg:error})
    }
}