// import { IJwtRole } from '../../models/User'

declare namespace Express {
    type PrismaClient = import("@prisma/client").PrismaClient
    type IJwtUser = import("../../interface/jwt-user.interface").IJwtUser

    export interface Request {
        user: IJwtUser
        prisma: PrismaClient
        agent: "android" | "browser" | "postman"
        isHttps: boolean
        myBaseUrl: string
    }
}
