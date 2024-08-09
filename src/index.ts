import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { realTimeCommentsRouter } from './real-time-comments/routes'
import { createNodeWebSocket } from '@hono/node-ws'

const app = new Hono().basePath('/api')
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })
const realTimeComments = realTimeCommentsRouter(upgradeWebSocket)


app.route('/', realTimeComments)

const port = 8787
console.log(`Server is running on port ${port}`)

const server = serve({
  fetch: app.fetch,
  port
})

injectWebSocket(server)
