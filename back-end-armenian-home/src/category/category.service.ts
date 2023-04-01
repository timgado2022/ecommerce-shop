import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnCategoryObject } from './return-category.object';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}
    // сервис готовый
    // получение по айдишнику 
    async byId(id:number){
        const category = await this.prisma.category.findUnique({
            where: {
                id
            },
            select: returnCategoryObject
        })

        if(!category){
            throw new Error('Category not found')
        }

        return category
    }
    // получение слагов
    async bySlug(slug:string){
        const category = await this.prisma.category.findUnique({
            where: {
                slug
            },
            select: returnCategoryObject
        })

        if(!category){
            throw new Error('Category not found')
        }

        return category
    }
    // получение всех
    async getAll() {
        return this.prisma.category.findMany({
            select: returnCategoryObject // забираем поля, которые нужны 
        })
    }
    // создание
    async create() {
        return this.prisma.category.create({
            data: {
                name: '',
                slug: ''
            }
        })
    }
    // обновление
    async update(id: number, dto: CategoryDto ) {
        return this.prisma.category.update({
            where: {
                id
            }, 
            data: {
                name: dto.name,
                slug: generateSlug(dto.name)
            }
        })
    }
    // удаление
    async delete(id: number ) {
        return this.prisma.category.delete({
            where: {
                id
            }
        })
    }
 }

