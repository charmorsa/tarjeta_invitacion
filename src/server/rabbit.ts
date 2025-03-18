import amqp from 'amqplib'
import clc from 'cli-color'

const RABBITMQ_URL = 'amqp://127.0.0.1:5672'

export async function testRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL)
        console.log(clc.greenBright('Connected to RabbitMQ'))

        const channel = await connection.createChannel()
        console.log(clc.green('Channel created'))

        return {connection, channel}
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error)
    }
}
