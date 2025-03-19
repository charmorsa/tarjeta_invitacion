import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY
const IV = process.env.IV

export function decryptData(encryptedText: string): any {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'utf-8'), IV)
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')
    return JSON.parse(decrypted)
}
