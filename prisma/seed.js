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
    const createdSuppliers = [];
    for (let supplier of suppliers) {
        const createdSupplier = await prisma.supplier.create({
            data: supplier
        });
        createdSuppliers.push(createdSupplier); // Save the created supplier for later use
    }
    return createdSuppliers; // Return the created suppliers
}

async function seedProducts(createdSuppliers) {
    for (let product of products) {
        const supplier = createdSuppliers.find(s => s.id === product.supplierId);
        if (supplier) {
            console.log(`Seeding product: ${product.name} with supplierId: ${supplier.id}`);  // Log the supplierId
            await prisma.product.create({
                data: {
                    ...product,
                    supplierId: supplier.id // Ensure product has a valid supplierId
                }
            });
        } else {
            console.error(`No supplier found for supplierId: ${product.supplierId}`);
        }
    }
}

async function main() {
    await seedUsers();
    const createdSuppliers = await seedSuppliers();
    await seedProducts(createdSuppliers); // Pass the created suppliers to seed products
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
