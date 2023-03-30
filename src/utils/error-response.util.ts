import { Prisma } from "@prisma/client"
import { Response } from "express"
import { StatusCode } from "../config/constant"
import MyResponse from "./my-response.util"
import PrismaErrorCode from "../config/prisma-error-code"

const errorResponse = (
    res: Response,
    e: Prisma.PrismaClientValidationError | Prisma.PrismaClientKnownRequestError | unknown
) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let message = `${e.message}, Error Code: ${(e as any)?.code}`
        if (e.code.startsWith("P20")) {
            const index = Object.values(PrismaErrorCode).findIndex((item) => item === e.code)
            if (index !== -1) {
                // error is known
                // const errorKey = Object.keys(PrismaErrorCode)[index]
                const errorValue = Object.values(PrismaErrorCode)[index]
                if (errorValue === PrismaErrorCode.UniqueConstraintViolation) {
                    if (e.meta?.target !== "PRIMARY") {
                        message = `${`${e.meta?.target}`
                            .replaceAll("_", " ")
                            .replaceAll("key", "")} is already used!`
                    } else {
                        message = `Already created!`
                    }
                } else if (errorValue === PrismaErrorCode.ForeignConstraintViolation) {
                    message = `Invalid ${e.meta?.field_name}!`
                } else if (errorValue === PrismaErrorCode.RecordsNotFound) {
                    message = `Many to many relation values are invalid! ${e.meta?.cause}.`
                } else if (errorValue === PrismaErrorCode.ValueTooLongForColumnType) {
                    message = `Too Long Value for ${e.meta?.column_name}.`
                }
                // else {
                //     message = `${errorKey} on ${e.meta?.target}`
                // }
            }
            return res.status(StatusCode.BAD_REQUEST).json(MyResponse(message, undefined))
        }
        return res.status(StatusCode.SERVER_ERROR).json(MyResponse(message, undefined))
    }
    return res.status(StatusCode.BAD_REQUEST).json(MyResponse((e as Error).message, e))
}
export default errorResponse
