import { Router } from "express"
import validateMid from "../../middleware/validate.mid"
import { CreateUserDto } from "./dto/register.dto"
import RegisterController from "./register.controller"

const RegisterRouter = Router()

/**
 * @description register a user
 * @post http://localhost:4000/api/auth/register/
 */
RegisterRouter.post("/", validateMid(CreateUserDto), RegisterController.registerWithEmailPassword)

export default RegisterRouter
