import { Category, PrismaClient, Product } from "@prisma/client";
import * as dotenv from "dotenv"

dotenv.config();
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
    
    const product : Product[] = []

    console.log(`Created ${product.length} products`)

}

// const createProducts = await prisma.product.create({
//     data: {
//         name: "Kerakur. Икра баклажановая",
//         slug: "kerakur ikra",
//         description: "Икра баклажановая",
//         price: 250,
//         images: [],
//         category: {
//             create:{
//                 name: "Овощная консервация",
//                 slug: "ovoschnaya-konservatsiya", 
//             }
//         }
//     }
// })

async function main() {
    console.log("Start seeding...")   
    await createProducts(10);   
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })