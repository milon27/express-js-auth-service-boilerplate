import { Application } from "express"
import AuthMid from "../middleware/auth.mid"
import HealthCheckRouter from "../module/health-check/health-check.router"
import LoginRouter from "../module/login/login.router"
import RegisterRouter from "../module/register/register.router"
import UserRouter from "../module/user/user.router"

const prefix = "/api/auth"

const routerConfig = (app: Application) => {
    app.use(`${prefix}/`, HealthCheckRouter)
    app.use(`${prefix}/register`, RegisterRouter)
    app.use(`${prefix}/login`, LoginRouter)
    app.use(`${prefix}/user`, AuthMid.isLoggedInMid, UserRouter)
}

export default routerConfig
