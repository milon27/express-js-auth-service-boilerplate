import { Request, Response } from "express"
import { StatusCode } from "../../config/constant"
import errorResponse from "../../utils/error-response.util"
import Logger from "../../utils/logger.util"
import MyResponse from "../../utils/my-response.util"
import UserService from "./user.service"

const UserController = {
    getLoggedInUser: async (req: Request, res: Response) => {
        try {
            // check user is available or not in db
            const user = await UserService.getUserByIdentifier(req.prisma, "id", req.user.id)
            if (!user) {
                return res.status(StatusCode.FORBIDDEN).send(MyResponse("No User Found"))
            }
            return res.status(StatusCode.OK).json(MyResponse("got user successfully", user))
        } catch (e) {
            Logger.error(e)
            return errorResponse(res, e)
        }
    },
    getSingleUser: async (req: Request, res: Response) => {},
    getAllByPaginate: async (req: Request, res: Response) => {},
    createUser: async (req: Request, res: Response) => {},
    updateUser: async (req: Request, res: Response) => {},
    deleteUser: async (req: Request, res: Response) => {},
}
export default UserController
