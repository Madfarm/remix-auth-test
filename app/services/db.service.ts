import { prisma } from "~/db.server";

export async function findOrCreateUser(data: any) {
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
            ...data
        });

        return user;
    }
}