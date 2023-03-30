import { Permission, Role } from "@prisma/client"
import jwt from "jsonwebtoken"

export interface IJwtUser {
    id: string
    role: Role & { permissions: Permission[] }
}

// common helper functions
const JwtUtil = {
    generateJWTtoken: (payload: IJwtUser) => {
        return jwt.sign(payload, `${process.env.JWT_SECRET}`)
    },
    verifyJWTtoken: (token: string): IJwtUser => {
        try {
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            const payload = jwt.verify(token, `${process.env.JWT_SECRET}`) as IJwtUser

            return {
                id: payload.id as string,
                role: payload.role as Role,
            } as IJwtUser
        } catch (e) {
            throw new Error("Unauthorized Access")
        }
    },
}

export default JwtUtil
