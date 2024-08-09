import { Hono } from "hono";
import { UpgradeWebSocket } from "hono/ws";
import { RealTimeCommentsController } from "./controller";


export const realTimeCommentsRouter = (upgradeWebSocket: UpgradeWebSocket) => {
    const app = new Hono()
    const realTimeCommentsController = new RealTimeCommentsController()
    app.get('/real-time-comments/ws', upgradeWebSocket(c => realTimeCommentsController.initRealTimeWebSocketHandler(c)))
    return app;
}
