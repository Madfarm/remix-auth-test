-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderNumber" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "orderTotal" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lineNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "requestedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
