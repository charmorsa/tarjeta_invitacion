import clc from "cli-color"
import { sendEmail } from "../../config/send.email.controller"
import { testRabbitMQ } from "../../server/rabbit"

export async function consumeMessages(cola: string) {
    const {channel} = await testRabbitMQ()
  
    await channel.assertQueue(cola, { durable: true })
    console.log(clc.yellow(`Waiting for messages in ${cola}...`))
  
    channel.consume(cola, (msg) => {
        if (msg) {
            console.log(`Received message: ${msg.content.toString()}`)
            const mensaje = msg.content.toString()
            const m = mensaje.split('_')
            sendEmail(m[0], m[1], m[2])
            channel.ack(msg);
        }
    })
}   
