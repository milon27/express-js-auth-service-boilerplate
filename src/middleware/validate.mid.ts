import { Response, Request, NextFunction } from "express"
import { ObjectSchema } from "joi"
import { StatusCode } from "../config/constant"
import MyResponse from "../utils/my-response.util"

const validateMid = <T>(schema: ObjectSchema<T>) => {
    // eslint-disable-next-line consistent-return
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await schema.validateAsync(req.body, {
                abortEarly: false,
            })
            req.body = data
            next()
        } catch (errors) {
            // console.error("ValidateMid", (errors as any).message);
            let err = errors
            if (errors) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                err = ((errors as any).details as Array<any>).map((item) => {
                    return {
                        key: item.context.key,
                        message: item.message,
                    }
                })
            }
            return res.status(StatusCode.BAD_REQUEST).send(MyResponse((errors as Error).message, err))
        }
    }
}
export default validateMid
