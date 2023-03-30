import { Permission, PrismaClient, Role, User } from "@prisma/client"
import bcryptjs from "bcryptjs"
import Constant from "../../config/constant"
import { ICreateUserDto } from "../register/dto/register.dto"

type IUserWithRole = Omit<User, "password"> & {
    role: Role & {
        permissions: Permission[]
    }
    password?: string
}

const UserService = {
    getUserByIdentifier: async (
        prisma: PrismaClient,
        by: "id" | "email",
        identifier: string,
        includePassword = false
    ): Promise<IUserWithRole | undefined> => {
        const user = await prisma.user.findUnique({
            where: {
                id: by === "id" ? identifier : undefined,
                email: by === "email" ? identifier : undefined,
            },
            include: {
                role: {
                    include: {
                        permissions: true,
                    },
                },
            },
        })
        if (user) {
            return { ...user, password: includePassword ? user.password : undefined }
        }
        return undefined
    },
    createUser: async (prisma: PrismaClient, body: ICreateUserDto): Promise<IUserWithRole> => {
        const { fullName, email, avatar, gender, city, deviceToken, dob } = body as ICreateUserDto
        const password = body.password || Constant.DEFAULT_PASSWORD
        // get hash pass & save new user into db
        const hashpass = await bcryptjs.hash(password, await bcryptjs.genSalt(10))

        // create the new user.
        const user = await prisma.user.create({
            data: {
                fullName,
                email: email.toLowerCase().trim(),
                password: hashpass,
                role: {
                    connectOrCreate: {
                        create: {
                            title: Constant.DEFAULT_ROLE,
                            slug: Constant.DEFAULT_ROLE,
                            description: "customers",
                        },
                        where: {
                            slug: Constant.DEFAULT_ROLE,
                        },
                    },
                },
                city,
                deviceToken,
                dob,
                avatar,
                gender,
            },
            include: {
                role: {
                    include: {
                        permissions: true,
                    },
                },
            },
        })
        return { ...user, password: undefined }
    },
    validateUser: async (prisma: PrismaClient, email: string, password: string) => {
        const user = await UserService.getUserByIdentifier(prisma, "email", email, true)

        if (user) {
            const ckPass = await bcryptjs.compare(password, `${user.password}`)
            if (ckPass) {
                return { ...user, password: undefined }
            }
        }
        return undefined
    },
}
export default UserService
