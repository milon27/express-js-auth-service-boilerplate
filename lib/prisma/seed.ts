import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const doSeed = async () => {
    // await prisma.role.deleteMany({})
    // await prisma.user.deleteMany({})

    // create role
    await prisma.role.createMany({
        data: [
            {
                slug: "admin",
                title: "Admin",
                canAccessCms: true,
                description: "can access everything",
            },
            {
                slug: "customer",
                title: "customer",
                canAccessCms: false,
                description: "can access only web app",
            },
        ],
    })
    //create user
}

doSeed()
    .then(() => {
        console.log("seed done")
    })
    .catch((e) => {
        console.log(e)
        console.log("alredy seeded")
    })
