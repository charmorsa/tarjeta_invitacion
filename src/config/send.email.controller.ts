import clc from "cli-color"
import * as nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from "path"
import { readFileSync } from "fs"

dotenv.config()
const user = process.env.EMAILUSER
const pass = process.env.EMAILPASS

export async function sendEmail(receptor:string, subject:string, text:any) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user,
                pass
            }
        })

        const imagePath = path.join(__dirname, '../../fondo.png')
        const imageContent = readFileSync(imagePath)
    
        const texto = text.split(';')
        const m0 = texto[0] || ""
        const m1 = texto[1] || ""
        const m2 = texto[2] || ""
        const m3 = texto[3] || ""
        const m4 = texto[4] || ""
        const m5 = texto[5] || ""
        const m6 = texto[6] || ""
        const m7 = texto[7] || ""
        
        const mailOptions = {
            from: user, 
            to: receptor, 
            subject,
            html: `
                <div style="border: 4px solid grey; padding: 20px; text-align: center; margin: auto; width: auto; background-color: #536566;">
                    <div style="border: 2px solid grey; padding: 10px; text-align: center; margin: auto; width: auto; background-color: #0A4467;">
                        <img src="cid:neo"/>
                    </div>
                    <br>
                    <div style="border: 2px solid grey; padding: 10px; text-align: center; margin: auto; width: auto;background-color: #2D85CC;">
                        <h2>${subject}</h2>
                    </div>
                    <br>
                    <div style="border: 2px solid grey; padding: 10px; text-align: center; margin: auto; width: auto;background-color:#FFFFF0;">
                        <h4>---------------------------------------------------------</h4>
                        <h3>${m0}</h3>
                        <h3>${m1}</h3>
                        <h3>${m2}</h3>
                        <h3>${m3}</h3>
                        <h3>${m4}</h3>
                        <h3>${m5}</h3>
                        <h3>${m6}</h3>
                        <h3>${m7}</h3>
                        <h4>---------------------------------------------------------</h4>
                    </div>
                    <br>
                    <div style="border: 2px solid grey; padding: 10px; text-align: center; margin: auto; width: auto; background-color: #D6C552;">
                        <p>© 2025</p>
                    </div>
                </div>
            `,
            attachments: [
                {
                  filename: 'neo.png',
                  content: imageContent,
                  cid: 'neo'
                }
            ]
        }
    
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
