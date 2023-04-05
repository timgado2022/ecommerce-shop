import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnProductObject, returnProductObjectFullest } from './return-product.object';
import { returnCategoryObject } from 'src/category/return-category.object';
import { generateSlug } from 'src/utils/generate-slug';
import { ProductDto } from './dto/product.dto';
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { Prisma } from '@prisma/client';
import e from 'express';

@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService, private paginationService: PaginationService) {}
    // сервис продуктов 

    async getAll(dto: GetAllProductDto = {}) {
        const {sort, searchTerm} = dto

        const prismaSort:Prisma.ProductOrderByWithRelationInput[] = []

        if(sort === EnumProductSort.LOW_PRICE) {
            prismaSort.push({
                price: 'asc'
            })
        } else if(sort === EnumProductSort.HIGH_PRICE) {
            prismaSort.push({
                price: 'desc'
            })
        }
        else if(sort === EnumProductSort.OLDEST) {
            prismaSort.push({
                createdAt: 'asc'
            })
        } else {
            prismaSort.push({
                createdAt: 'desc'
            })
        }

        const prismaSearchTermFilter:Prisma.ProductWhereInput = searchTerm ? {
            OR: [ // тут описывается по каким полям идти поиск
                    {   
                    category: { // по имени в категории
                        name:{
                            contains: searchTerm,
                            mode: 'insensitive' // кейс не важен(то есть не важно как текст написан большими или же маленькими, он все равно зачтет)
                        }
                        }
                    },
                   { 
                    name: { // по имени в продукте
                        contains: searchTerm,
                        mode: 'insensitive'
                         }
                    }, // по имени в описании
                    {
                        description: {
                        contains: searchTerm,
                        mode: 'insensitive'
                            }
                     }
                
            ]
        } : {}

        const {perPage, skip} = this.paginationService.getPagination(dto)

        const products = await this.prismaService.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage
        })
        return {
            products,
            length: await this.prismaService.product.count({
                where: prismaSearchTermFilter
            })
        }
        }
    

    //метод получение по айдишнику 
    async byId(id:number){
        const product = await this.prismaService.product.findUnique({
            where: {
                id
            },
            select: returnProductObjectFullest
        })

        if(!product){
            throw new NotFoundException('Product not found')
        }
        return product
    }
    // метод получение слагов
    async bySlug(slug:string){
        const category = await this.prismaService.product.findUnique({
            where: {
                slug
            },
            select: returnProductObjectFullest
        })

        if(!category){
            throw new Error('Category not found')
        }

        return category
    }

    //метод показания категории
    async byCategory(categorySlug: string) {
        const products = await this.prismaService.product.findMany({
            where: {
                category:{
                    slug: categorySlug
                }
            },
            select: returnProductObjectFullest
        })

        if(!products){
            throw new NotFoundException('Products not found')
        }
        return products
    }

    // метод найти похожий товар
    async getSimilar(id: number) {
        const currentProduct = await this.byId(id)

        if(!currentProduct) {
            throw new NotFoundException('Current  product not found')
        }

        const products = await this.prismaService.product.findMany({
            where: {
                category: {
                    name: currentProduct.category.name
                },
                NOT: {
                    id: currentProduct.id
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: returnProductObject
        })
    }
    // метод создание своей категории
    async create() {
        const product =  await this.prismaService.product.create({
            data: {
                description: '',
                name: '',
                price: 0,
                slug: ''
            }
        })
        return product.id
    }
    // метод обновление категории
    async update(id: number, dto: ProductDto ) {
        const { name, description, images, price, categoryId } = dto;
        return this.prismaService.product.update({
            where: {
                id
            }, 
            data: {
                description, 
                images, 
                price,
                name,
                slug: generateSlug(name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })
    }
    // метод удаления метода
    async delete(id: number ) {
        return this.prismaService.product.delete({
            where: {
                id
            }
        })
    }
}
