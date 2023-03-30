import * as Sentry from "@sentry/node"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import routerConfig from "./config/router.config"
import { getSentryConfig } from "./config/sentry.config"
import { shutdownServer } from "./config/shutdown.config"
import errorsMid from "./middleware/error.mid"
import infoMid from "./middleware/info.mid"
import loggerMid from "./middleware/logger.mid"
import prismaMid from "./middleware/prisma.mid"

// init
dotenv.config()
const app = express()
Sentry.init(getSentryConfig(app))

// middleware
app.use(Sentry.Handlers.requestHandler())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ origin: true }))
app.use([infoMid, prismaMid, loggerMid])
app.use(Sentry.Handlers.tracingHandler())

// routers
routerConfig(app)

// global error handle
app.use(Sentry.Handlers.errorHandler())
app.use(errorsMid)

// run the app
const port = process.env.PORT || 4000
const server = app.listen(port, () => console.log(`Server Running on ${process.env.BASE_AUTH_SERVICE} 🚀`))

// gracefull shutdown
shutdownServer(server)
