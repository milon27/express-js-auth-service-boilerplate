import { Request, Response } from "express"
import { StatusCode } from "../../config/constant"
import errorResponse from "../../utils/error-response.util"
import JwtUtil from "../../utils/jwt.util"
import Logger from "../../utils/logger.util"
import MyResponse from "../../utils/my-response.util"
import UserService from "../user/user.service"
import { ICreateUserDto } from "./dto/register.dto"

const RegisterController = {
    registerWithEmailPassword: async (req: Request, res: Response) => {
        try {
            const user = await UserService.createUser(req.prisma, req.body as ICreateUserDto)

            // get token and set into cookie
            const token = JwtUtil.generateJWTtoken({
                id: user.id,
                role: user.role,
            })
            return res.status(StatusCode.CREATED).json(MyResponse("User created successfully", { user, token }))
        } catch (e) {
            Logger.error(e)
            return errorResponse(res, e)
        }
    },
}
export default RegisterController
