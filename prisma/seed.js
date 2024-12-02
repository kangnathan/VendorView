// seed.js
import { products } from "./products.js";
import { suppliers } from "./suppliers.js";
import { users } from "./users.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
    for (let user of users) {
        await prisma.user.create({
            data: user
        });
    }
}

async function seedSuppliers() {
    for (let supplier of suppliers) {
        await prisma.supplier.create({
            data: supplier
        });
    }
}

async function seedProducts() {
    for (let product of products) {
        await prisma.product.create({
            data: product
        });
    }
}

async function main() {
    await seedUsers();
    await seedSuppliers();
    await seedProducts();
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
