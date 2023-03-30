import { Request, Response } from "express"
import Constant, { StatusCode } from "../../config/constant"
import errorResponse from "../../utils/error-response.util"
import JwtUtil from "../../utils/jwt.util"
import Logger from "../../utils/logger.util"
import MyResponse from "../../utils/my-response.util"
import UserService from "../user/user.service"
import { ILoginWithEmailDto, ILoginWithGoogleDto } from "./dto/login.dto"
import LoginService from "./login.service"

const LoginController = {
    loginWithEmail: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body as ILoginWithEmailDto

            // check user is available or not in db
            const user = await UserService.validateUser(req.prisma, email, password)
            if (!user) {
                throw new Error(`No User Found with ${email}`)
            }
            // get token and set into cookie
            const token = JwtUtil.generateJWTtoken({
                id: user.id,
                role: user.role,
            })

            return res.status(200).json(
                MyResponse("user loggedin successfully", {
                    ...user,
                    token,
                })
            )
        } catch (e) {
            Logger.error(e)
            return errorResponse(res, e)
        }
    },
    continueWithGoogle: async (req: Request, res: Response) => {
        try {
            const { idToken } = req.body as ILoginWithGoogleDto

            // check user is available or not in db
            const email = await LoginService.verifyGoogleIdToken(idToken)
            const user = await UserService.validateUser(req.prisma, email, Constant.DEFAULT_PASSWORD)
            if (!user) {
                // tell them to send to complete profile screen
                return res
                    .status(StatusCode.OK)
                    .send(MyResponse("Google Authentication successfull, complete the user profile and signup!"))
            }
            // get token and set into cookie
            const token = JwtUtil.generateJWTtoken({
                id: user.id,
                role: user.role,
            })

            return res.status(200).json(
                MyResponse("user loggedin successfully", {
                    ...user,
                    token,
                })
            )
        } catch (e) {
            Logger.error(e)
            return errorResponse(res, e)
        }
    },
}
export default LoginController
