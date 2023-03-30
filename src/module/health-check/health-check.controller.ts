import { Request, Response } from "express"
import { StatusCode } from "../../config/constant"
import MyResponse from "../../utils/my-response.util"

const HealthCheckController = {
    getBasicInfo: (req: Request, res: Response) => {
        res.send(
            `Running app in ${process.env.NODE_ENV} , https:${req.isHttps}, TZ:${
                process.env.TZ || "UTC"
            } base url: ${req.myBaseUrl}... 🚀`
        )
    },
    checkDatabaseConnection: async (req: Request, res: Response) => {
        try {
            const result = await req.prisma.$queryRaw`select now()`
            res.status(StatusCode.OK).send(MyResponse("db connected", result))
        } catch (e) {
            console.log(e)
            res.status(StatusCode.SERVER_ERROR).send(
                MyResponse(`db not connected ${(e as Error).message}`, undefined)
            )
        }
    },
}
export default HealthCheckController
