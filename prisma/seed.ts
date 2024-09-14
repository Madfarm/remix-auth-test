import { prisma } from "~/db.server";

async function seed() {
    await prisma.item.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.user.deleteMany({});


    let user = await prisma.user.create({
        data: {
            userName: "kat",
            password: "catcat"
        }
    })

    await prisma.order.createMany({
        data: [
            {
                orderNumber: 41,
                customerName: "Jeff",
                contact: "jeff@email.com",
                status: "Open",
                orderTotal: 51.65,
                userId: user.id
            },
            {
                orderNumber: 37,
                customerName: "Willow",
                contact: "willow@email.com",
                status: "Closed",
                orderTotal: 51.65,
                userId: user.id
            },
            {
                orderNumber: 34,
                customerName: "Abby",
                contact: "abbysolutely@email.com",
                status: "Closed",
                orderTotal: 51.65,
                userId: user.id
            },
        ]
    })

    console.log("Db has been seeded")

}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


