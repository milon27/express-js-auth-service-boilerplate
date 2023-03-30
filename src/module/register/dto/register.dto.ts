import { Gender } from "@prisma/client"
import Joi from "joi"
import { DateString } from "../../../types/date.type"
import Constant from "../../../config/constant"

export interface ICreateUserDto {
    fullName: string
    email: string
    city: string
    dob: DateString
    gender: Gender
    password?: string
    avatar?: string
    deviceToken?: string
}

export const CreateUserDto = Joi.object<ICreateUserDto>({
    fullName: Joi.string().trim().min(2).regex(new RegExp(Constant.STRING_NUM_SPACE_PATTERN)).required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().trim().min(6).optional(),
    city: Joi.string().trim().required(),
    gender: Joi.string()
        .valid(...Object.values(Gender))
        .required(),
    dob: Joi.date().required(),
    avatar: Joi.string().trim().optional(),
    deviceToken: Joi.string().trim().optional(),
})
