import { Request, Response } from "express"
import MyResponse from "../utils/my-response.util"
import { StatusCode } from "../config/constant"
import Logger from "../utils/logger.util"

const notFoundMid = (req: Request, res: Response) => {
    res.status(StatusCode.NOT_FOUND).send(MyResponse("Route Not Found"))
}

const errorMid = (err: Error, req: Request, res: Response) => {
    Logger.error("Global ErrorMid", err)
    res.status(StatusCode.SERVER_ERROR).send(MyResponse(err.message))
}

const errorsMid = [notFoundMid, errorMid]

export default errorsMid
