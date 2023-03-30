import { Router } from "express"
import UserController from "./user.controller"

const UserRouter = Router()

/**
 * @description get all user with paginate
 * @get http://localhost:4000/api/auth/user/
 */
UserRouter.get("/", UserController.getLoggedInUser)

/**
 * @description get all user with paginate
 * @get http://localhost:4000/api/auth/user/all
 */
UserRouter.get("/all", UserController.getAllByPaginate)

/**
 * @description get single user
 * @get http://localhost:4000/api/auth/user/:id
 */
UserRouter.get("/:id", UserController.getSingleUser)

/**
 * @description create a new user
 * @post http://localhost:4000/api/auth/user/
 */
UserRouter.post("/", UserController.createUser)

/**
 * @description update a user
 * @put http://localhost:4000/api/auth/user/:id
 */
UserRouter.put("/:id", UserController.updateUser)

/**
 * @description delete a user
 * @delete http://localhost:4000/api/auth/user/:id
 */
UserRouter.delete("/:id", UserController.deleteUser)

export default UserRouter
