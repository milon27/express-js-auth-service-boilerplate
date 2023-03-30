import { Response, Request, NextFunction } from "express"
import { prismaClient } from "../config/prisma.config"

const prismaMid = (req: Request, res: Response, next: NextFunction) => {
    req.prisma = prismaClient
    next()
}
export default prismaMid
