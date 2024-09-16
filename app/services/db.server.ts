import { prisma } from "~/db.server";
import { matchSorter } from "match-sorter";


export interface OrderType {
    id: number;
    orderNumber: number;
    customerName: string;
    contact: string;
    status: string;
    orderTotal: number;
    userId: number;
}



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

export async function getUserByName(name: string) {
    let user = await prisma.user.findFirst({
        where: {
            userName: name
        },
        include: {
            orders: true
        }
    })

    if(!user) {
        throw new Error("User not found");
    }

    return user;
}

export async function getOrders(name: string, query?: string | null, filter?: string | null) {
    let orders = (await getUserByName(name)).orders;

    if(filter && filter != "Clear") {
        orders = orders.filter(order => order.status === filter)
    }

    if (query) {
        orders = matchSorter(orders, query, {
            keys: ["customerName", "orderNumber"]
        });
    }

    return orders;
}