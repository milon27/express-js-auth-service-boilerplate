import { Response, Request, NextFunction } from "express"
import Logger from "../utils/logger.util"

const loggerMid = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(`REQ URL= ${req.url}`)
    next()
}
export default loggerMid
