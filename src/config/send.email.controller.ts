import clc from "cli-color"
import * as nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const user = process.env.EMAILUSER
const pass = process.env.EMAILPASS

export async function sendEmail(receptor:string, subject:string, text:string) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user,
                pass
            }
        })
    
        const mailOptions = {
            from: user, 
            to: receptor, 
            subject,
            text
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(clc.magenta('Error al enviar el correo:', error));
            } else {
                console.log(clc.cyan('Correo enviado:', info.response));
            }
        })
    } catch (error) {
        console.error(clc.red('Error, contactese con el administrador', error))
    }
}