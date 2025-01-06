import { products } from "./products.js";
import { suppliers } from "./suppliers.js";
import { users } from "./users.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {

    console.log("Seeding users...");
    await Promise.all(users.map((user) => prisma.user.create({ data: user })));
    console.log("Users seeded successfully!");

    console.log("Seeding suppliers...");
    const createdSuppliers = await Promise.all(
      suppliers.map((supplier) => prisma.supplier.create({ data: supplier }))
    );
    console.log("Suppliers seeded successfully!");

    const supplierMap = createdSuppliers.reduce((map, supplier) => {
      map[supplier.name] = supplier.id;
      return map;
    }, {});

    console.log("Seeding products...");
    for (let product of products) {
      const supplierId = supplierMap[product.supplierName];
      if (supplierId) {
        console.log(
          `Seeding product: ${product.name} with supplierId: ${supplierId}`
        );

        const { supplierName, ...productData } = product;

        await prisma.product.create({
          data: {
            ...productData,
            supplierId, 
          },
        });
      } else {
        console.error(
          `No supplier found for supplierName: ${product.supplierName}`
        );
      }
    }
    console.log("Products seeded successfully!");
  } catch (e) {
    console.error("Error seeding data:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
