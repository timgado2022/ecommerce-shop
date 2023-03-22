import { faker } from "@faker-js/faker";
import { Category, Prisma, PrismaClient, Product } from "@prisma/client";
import * as dotenv from "dotenv"
import { products } from "./product/productList";

dotenv.config();
const prisma = new PrismaClient()

// const products: Prisma.ProductsCreateInput[] = [
//     {
//         name: "Armatfood. Компот из терна",
//         slug: "armatfood-komot-iz-terna",
//         description: "",
//         price: 205,
//         images: ["https://gurmanarmenia.ru/image/cache/catalog/irafoto/armatfud/tern-228x228.png"],
//         category: "Напитки | Компоты | Соки"
//     }
// ]
const createProducts = async () =>{
    const products: Product[] = [];

    const product = await prisma.product.create({
    data: {
        name: "Kerakur. Икра баклажановая",
        slug: "kerakur ikra",
        description: "Икра баклажановая",
        price: 250,
        images: [],
        category: {
            create:{
                name: "Овощная консервация",
                slug: "ovoschnaya-konservatsiya", 
            }
        },
        reviews: {
            create:[
                {
                    rating: faker.datatype.number({ min: 1, max: 5 }),
                    text: faker.lorem.paragraph(),
                    user: {
                        connect: {
                            id: 1
                        }
                    }

                },
                {
                    rating: faker.datatype.number({ min: 1, max: 5 }),
                    text: faker.lorem.paragraph(),
                    user: {
                        connect: {
                            id: 1
                        }
                    }
                }
            ]
        }
    }
})
    products.push(product)
}


async function main() {
    console.log("Start seeding...")   
   
} 


main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })