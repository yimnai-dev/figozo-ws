import { Context } from "hono";
import { WSContext, WSEvents } from "hono/ws";
import { realTimeCommentsIncomingMessageSchema } from "./schema";
import { addOrderComment } from "./utils";

export class RealTimeCommentsController {
    private clients = new Set<WSContext>()
    public initRealTimeWebSocketHandler = (ctx: Context): WSEvents => {
        return {
            onOpen: async (ev, ws) => {
                console.log('Connection opened for real time comments. Client: ')
                console.info('Connection opened for real time comments')
                this.clients.add(ws)
                console.log('clientCount: ', this.clients.size)
            },
            onClose: async (ev, ws) => {
                this.clients.delete(ws)
                ws.send(JSON.stringify({
                    type: 'error',
                    message: 'Connection closed'
                }))
                console.info('Connection closed for real time comments')
            },
            onError: async (_, ws) => {
                console.info('Connection error for real time comments. Client: ', ws)
                ws.send(JSON.stringify({
                    type: 'error',
                    message: 'Connection error'
                }))
                this.clients.delete(ws)
            },
            onMessage: async (ev, ws) => {
                if (typeof ev.data !== 'string') return;
                const data = JSON.parse(ev.data)
                const parsedData = realTimeCommentsIncomingMessageSchema.safeParse(data)
                if (!parsedData.success) {
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: parsedData.error.message
                    }))
                    return;
                }
                if (parsedData.data.type === 'merchant-comment' || parsedData.data.type === 'customer-comment') {
                    const response = await addOrderComment({
                        params: parsedData.data.params,
                        origin: parsedData.data.type === 'merchant-comment' ? 'merchant' : 'customer',
                    })
                    if (response?.error) {
                        ws.send(JSON.stringify(response.error))
                    }
                    this.clients.forEach(client => {
                        client.send(JSON.stringify({
                            type: 'order-comment',
                            comment: {
                                created_on: new Date().toString(),
                                msg: parsedData.data.params.msg,
                                is_customer: parsedData.data.type === 'customer-comment',
                            },
                            order_id: parsedData.data.params.order_id
                        }))
                    })
                }
            }
        }
    }
}