import { faker } from "@faker-js/faker";
import { Category, Prisma, PrismaClient, Product } from "@prisma/client";
import * as dotenv from "dotenv"
import { getRandomNumber } from "src/utils/random-number";

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
// const createProducts = async () =>{
//     const product: Product[] = [];
//     products.push(product)
    

//     const product = await prisma.product.create({
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
//         },
//         reviews: {
//             create:[
//                 {
//                     rating: faker.datatype.number({ min: 1, max: 5 }),
//                     text: faker.lorem.paragraph(),
//                     user: {
//                         connect: {
//                             id: 1
//                         }
//                     }

//                 },
//                 {
//                     rating: faker.datatype.number({ min: 1, max: 5 }),
//                     text: faker.lorem.paragraph(),
//                     user: {
//                         connect: {
//                             id: 1
//                         }
//                     }
//                 }
//             ]
//         }
//     }
    
// })

const createProducts = async (quantity: number) => {
    const products: Product[] = [];

    for (let i = 0; i < quantity; i++) {
        const productName = faker.commerce.productName();
        const categoryName = faker.commerce.department();

        const product = await prisma.product.create({
            data: {
                name: productName,
                slug: productName.toLowerCase().replace(/ /g, "-"),
                description: faker.commerce.productDescription(),
                price: +faker.commerce.price(1, 10000,0),
                images: Array.from({ length: 1 }).map(() => faker.image.imageUrl()
                ),
                category: {
                    create: {
                        name: categoryName, 
                        slug: categoryName.toLowerCase().replace(/ /g, "-")
                    }
                },
                reviews: {
                    create: [
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
            },
            
        })
        products.push(product)
    }

    console.log(`Creating ${products.length} products...`)
}


async function main() {
    console.log("Start seeding...")  
    await createProducts(10) 
   
} 


main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })