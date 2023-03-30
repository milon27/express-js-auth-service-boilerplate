import { Router } from "express"
import HealthCheckController from "./health-check.controller"

const HealthCheckRouter = Router()

/**
 * @description get basic info for test
 * @get http://localhost:4000/api/auth/
 */
HealthCheckRouter.get("/", HealthCheckController.getBasicInfo)

/**
 * @description get single HealthCheck
 * @get http://localhost:4000/api/auth/db
 */
HealthCheckRouter.get("/db", HealthCheckController.checkDatabaseConnection)

export default HealthCheckRouter
