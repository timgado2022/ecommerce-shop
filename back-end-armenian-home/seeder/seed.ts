import { Category, PrismaClient, Product } from "@prisma/client";
import * as dotenv from "dotenv"

dotenv.config();
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
    
    const product : Product[] = [
        {id: 1 ,name: "Компьютер",slug: "",description: "", price: 1000, images: [""], category: "Компьютеры" },
    ]

    const category : Category[] = [
        {id: 1 ,name: "Компьютеры", createdAt: , updatedAt: , slug: "", description: "" },
    ]



    

    console.log(`Created ${product.length} products`)
}

async function main() {
    console.log("Start seeding...")   
    await createProducts(10);   
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })