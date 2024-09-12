import { prisma } from "~/db.server";

export async function RegisterUser(data: any) {
    let user = await prisma.user.findFirst({
        where: {
            userName: data.userName,
            password: data.password
        }
    })

    if(user){
        return user;
    } else {
        user = await prisma.user.create({
            data: {
                ...data
            }
        });

        return user;
    }
}

export async function Login(data: any) {
    let user = await prisma.user.findFirst({
        where: {
            userName: data.userName,
            password: data.password
        }
    })

    return user;
}