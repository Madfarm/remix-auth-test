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
            { orderNumber: 41, customerName: "Jeff", contact: "jeff@email.com", status: "Open", orderTotal: 51.65, userId: user.id },
            { orderNumber: 37, customerName: "Willow", contact: "willow@email.com", status: "Closed", orderTotal: 51.65, userId: user.id },
            { orderNumber: 34, customerName: "Abby", contact: "abbysolutely@email.com", status: "Closed", orderTotal: 51.65, userId: user.id },
            { orderNumber: 30, customerName: "Liam", contact: "liam@email.com", status: "Open", orderTotal: 63.45, userId: user.id },
            { orderNumber: 29, customerName: "Emma", contact: "emma@email.com", status: "Closed", orderTotal: 72.20, userId: user.id },
            { orderNumber: 28, customerName: "Noah", contact: "noah@email.com", status: "Open", orderTotal: 54.30, userId: user.id },
            { orderNumber: 27, customerName: "Olivia", contact: "olivia@email.com", status: "Closed", orderTotal: 81.75, userId: user.id },
            { orderNumber: 26, customerName: "Ethan", contact: "ethan@email.com", status: "Open", orderTotal: 62.10, userId: user.id },
            { orderNumber: 25, customerName: "Ava", contact: "ava@email.com", status: "Closed", orderTotal: 55.85, userId: user.id },
            { orderNumber: 24, customerName: "Mason", contact: "mason@email.com", status: "Open", orderTotal: 48.60, userId: user.id },
            { orderNumber: 23, customerName: "Sophia", contact: "sophia@email.com", status: "Closed", orderTotal: 95.40, userId: user.id },
            { orderNumber: 22, customerName: "James", contact: "james@email.com", status: "Open", orderTotal: 71.20, userId: user.id },
            { orderNumber: 21, customerName: "Isabella", contact: "isabella@email.com", status: "Closed", orderTotal: 60.90, userId: user.id },
            { orderNumber: 20, customerName: "Jacob", contact: "jacob@email.com", status: "Open", orderTotal: 66.55, userId: user.id },
            { orderNumber: 19, customerName: "Mia", contact: "mia@email.com", status: "Closed", orderTotal: 52.40, userId: user.id },
            { orderNumber: 18, customerName: "Benjamin", contact: "benjamin@email.com", status: "Open", orderTotal: 75.30, userId: user.id },
            { orderNumber: 17, customerName: "Charlotte", contact: "charlotte@email.com", status: "Closed", orderTotal: 89.95, userId: user.id },
            { orderNumber: 16, customerName: "Alexander", contact: "alexander@email.com", status: "Open", orderTotal: 58.65, userId: user.id },
            { orderNumber: 15, customerName: "Amelia", contact: "amelia@email.com", status: "Closed", orderTotal: 44.80, userId: user.id },
            { orderNumber: 14, customerName: "William", contact: "william@email.com", status: "Open", orderTotal: 63.75, userId: user.id },
            { orderNumber: 13, customerName: "Harper", contact: "harper@email.com", status: "Closed", orderTotal: 77.60, userId: user.id },
            { orderNumber: 12, customerName: "Jack", contact: "jack@email.com", status: "Open", orderTotal: 49.95, userId: user.id },
            { orderNumber: 11, customerName: "Evelyn", contact: "evelyn@email.com", status: "Closed", orderTotal: 68.20, userId: user.id },
            { orderNumber: 10, customerName: "Lucas", contact: "lucas@email.com", status: "Open", orderTotal: 53.85, userId: user.id },
            { orderNumber: 9, customerName: "Ella", contact: "ella@email.com", status: "Closed", orderTotal: 87.50, userId: user.id },
            { orderNumber: 8, customerName: "Henry", contact: "henry@email.com", status: "Open", orderTotal: 56.40, userId: user.id },
            { orderNumber: 7, customerName: "Grace", contact: "grace@email.com", status: "Closed", orderTotal: 64.95, userId: user.id },
            { orderNumber: 6, customerName: "Owen", contact: "owen@email.com", status: "Open", orderTotal: 78.25, userId: user.id },
            { orderNumber: 5, customerName: "Chloe", contact: "chloe@email.com", status: "Closed", orderTotal: 90.30, userId: user.id },
            { orderNumber: 4, customerName: "Sebastian", contact: "sebastian@email.com", status: "Open", orderTotal: 85.20, userId: user.id },
            { orderNumber: 3, customerName: "Zoe", contact: "zoe@email.com", status: "Closed", orderTotal: 72.60, userId: user.id },
            { orderNumber: 2, customerName: "Elijah", contact: "elijah@email.com", status: "Open", orderTotal: 61.95, userId: user.id },
            { orderNumber: 1, customerName: "Lily", contact: "lily@email.com", status: "Closed", orderTotal: 53.10, userId: user.id }
        ]
    });

    const orders = await prisma.order.findMany({});

    await prisma.item.createMany({
        data: [
            { lineNumber: 12, name: "Deli container (1qt)", quantity: 10, price: 0.58, orderId: orders[0].id },
            { lineNumber: 13, name: "Food storage box (2qt)", quantity: 12, price: 1.25, orderId: orders[1].id },
            { lineNumber: 14, name: "Plastic jar (1qt)", quantity: 15, price: 0.75, orderId: orders[2].id },
            { lineNumber: 15, name: "Glass container (1qt)", quantity: 20, price: 1.50, orderId: orders[3].id },
            { lineNumber: 16, name: "Reusable cup (1qt)", quantity: 25, price: 2.00, orderId: orders[4].id },
            { lineNumber: 12, name: "Deli container (1qt)", quantity: 30, price: 0.58, orderId: orders[5].id },
            { lineNumber: 13, name: "Food storage box (2qt)", quantity: 35, price: 1.25, orderId: orders[6].id },
            { lineNumber: 14, name: "Plastic jar (1qt)", quantity: 40, price: 0.75, orderId: orders[7].id },
            { lineNumber: 15, name: "Glass container (1qt)", quantity: 45, price: 1.50, orderId: orders[8].id },
            { lineNumber: 16, name: "Reusable cup (1qt)", quantity: 50, price: 2.00, orderId: orders[9].id },
            { lineNumber: 12, name: "Deli container (1qt)", quantity: 55, price: 0.58, orderId: orders[10].id },
            { lineNumber: 13, name: "Food storage box (2qt)", quantity: 60, price: 1.25, orderId: orders[11].id },
            { lineNumber: 14, name: "Plastic jar (1qt)", quantity: 65, price: 0.75, orderId: orders[12].id },
            { lineNumber: 15, name: "Glass container (1qt)", quantity: 70, price: 1.50, orderId: orders[13].id },
            { lineNumber: 16, name: "Reusable cup (1qt)", quantity: 75, price: 2.00, orderId: orders[14].id },
            { lineNumber: 12, name: "Deli container (1qt)", quantity: 80, price: 0.58, orderId: orders[15].id },
            { lineNumber: 13, name: "Food storage box (2qt)", quantity: 85, price: 1.25, orderId: orders[16].id },
            { lineNumber: 14, name: "Plastic jar (1qt)", quantity: 90, price: 0.75, orderId: orders[17].id },
            { lineNumber: 15, name: "Glass container (1qt)", quantity: 95, price: 1.50, orderId: orders[18].id },
            { lineNumber: 16, name: "Reusable cup (1qt)", quantity: 100, price: 2.00, orderId: orders[19].id },
            { lineNumber: 12, name: "Deli container (1qt)", quantity: 105, price: 0.58, orderId: orders[20].id },
            { lineNumber: 13, name: "Food storage box (2qt)", quantity: 110, price: 1.25, orderId: orders[21].id },
            { lineNumber: 14, name: "Plastic jar (1qt)", quantity: 115, price: 0.75, orderId: orders[22].id },
            { lineNumber: 15, name: "Glass container (1qt)", quantity: 120, price: 1.50, orderId: orders[23].id },
            { lineNumber: 16, name: "Reusable cup (1qt)", quantity: 125, price: 2.00, orderId: orders[24].id },
            { lineNumber: 12, name: "Deli container (1qt)", quantity: 130, price: 0.58, orderId: orders[25].id },
            { lineNumber: 13, name: "Food storage box (2qt)", quantity: 135, price: 1.25, orderId: orders[26].id },
            { lineNumber: 14, name: "Plastic jar (1qt)", quantity: 140, price: 0.75, orderId: orders[27].id },
            { lineNumber: 15, name: "Glass container (1qt)", quantity: 145, price: 1.50, orderId: orders[28].id },
            { lineNumber: 16, name: "Reusable cup (1qt)", quantity: 150, price: 2.00, orderId: orders[29].id },
            { lineNumber: 12, name: "Deli container (1qt)", quantity: 155, price: 0.58, orderId: orders[30].id },
            { lineNumber: 13, name: "Food storage box (2qt)", quantity: 160, price: 1.25, orderId: orders[31].id },
            { lineNumber: 14, name: "Plastic jar (1qt)", quantity: 165, price: 0.75, orderId: orders[32].id }
        ]
    });

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


