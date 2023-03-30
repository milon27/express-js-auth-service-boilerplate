import { Server } from "http"
import Logger from "../utils/logger.util"
import { prismaClient } from "./prisma.config"

export const shutdownServer = (server: Server) => {
    prismaClient.$on("beforeExit", async () => {
        server.close(() => {
            Logger.info("database connection lost, server closed")
        })
    })
    process.on("SIGTERM", () => {
        server.close(() => {
            Logger.info("server closed by signal")
        })
    })
}
