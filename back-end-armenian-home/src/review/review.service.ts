import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnReviewObject } from './return-review.object';
import { ReviewDto } from './review.dto';
import { generateSlug } from 'src/utils/generate-slug';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) {}
    // сервис отзывов
    
    // метод получение всех отзывов
    async getAll() {
        return this.prisma.review.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            select: returnReviewObject // забираем поля, которые нужны 
        })
    }
    // метод создание отзывов
    async create(userId: number, dto: ReviewDto, productId: number ) {
        return this.prisma.review.create({
            data: {
                ...dto,
                product: {
                    connect: {
                        id: productId 
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }
    
    // метод  получение среднего значения отзыва
    async getAverageRating(productId: number) {
        return this.prisma.review.aggregate({
            where: {productId},
            _avg: {rating: true}
        })
        .then(data => data._avg) // then нужен для того, чтобы забрать сразу же полученное число 
    }
 }

