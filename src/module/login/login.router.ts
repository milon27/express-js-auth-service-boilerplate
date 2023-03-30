import { Router } from "express"
import validateMid from "../../middleware/validate.mid"
import { LoginWithEmailDto, LoginWithGoogleDto } from "./dto/login.dto"
import LoginController from "./login.controller"

const LoginRouter = Router()

/**
 * @description login with email
 * @get http://localhost:4000/api/auth/login/email
 */
LoginRouter.post("/email", validateMid(LoginWithEmailDto), LoginController.loginWithEmail)

/**
 * @description login with google
 * @get http://localhost:4000/api/auth/login/google
 */
LoginRouter.post("/google", validateMid(LoginWithGoogleDto), LoginController.continueWithGoogle)

export default LoginRouter
