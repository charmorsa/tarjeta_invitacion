import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { respJson } from "../libs/respJson"
import {admin} from "../models/admin"
import {generateJWT} from '../libs/jwt'
import clc from "cli-color"
// import { sendEmail } from "./send.email.controller"

export const loginPage =async (req:Request, res:Response) => {
    try {
        const { user, password } = req.body
        const fecha = new Date()
        const userSearch: any = await admin.findOne({ user })
        if (!userSearch) return respJson(res,400,false,{ msg: 'Usuario no Existe'}) 
        if(!await bcrypt.compare(password, userSearch.password)) return respJson(res,400,false,{ msg: 'Contraseña no Valida'})

        const token = await generateJWT(userSearch)
        if(!token) return respJson(res,400,false,{ msg: 'Token no Generado' }) 

        // let text = `se ha Iniciado Sesion en el usuario ${user}, el dia ${fecha}
        // gracias por utilizar nuestro sistema
        // Walrus-Duck`
        // let type = 'Boda: Walrus-Duck'
        // let email = 'natubucher713@gmail.com'
        // sendEmail(email, type, text)
        return respJson(res,200,true,{ token: token, user: {id: userSearch._id, name: userSearch.name} })
    } catch (error) {
        console.error(clc.red('Error, contactese con el administrador',error))
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}