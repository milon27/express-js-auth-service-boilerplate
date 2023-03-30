import { NextFunction, Request, Response } from "express"
import Define, { StatusCode } from "../config/constant"
import JwtUtil from "../utils/jwt.util"
import MyResponse from "../utils/my-response.util"

const isLoggedInMid = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHead = req.headers.authorization
        const token = authHead && authHead.split(" ")[1]

        if (!token) {
            throw new Error("Unauthorized Access")
        }
        // token validation
        const userJwtPayload = JwtUtil.verifyJWTtoken(token)

        req.user = userJwtPayload
        next()
    } catch (e) {
        res.status(StatusCode.UNAUTHORIZED).json(MyResponse((e as Error).message))
    }
}

const isAdminMid = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req
        if (user.role.slug === Define.ADMIN_ROLE) {
            next()
        } else {
            throw new Error("you are not admin")
        }
    } catch (e) {
        res.status(StatusCode.FORBIDDEN).json(MyResponse((e as Error).message))
    }
}

const AuthMid = {
    isLoggedInMid,
    isAdminMid: [isLoggedInMid, isAdminMid],
}
export default AuthMid
