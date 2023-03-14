import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwt: JwtService) {} // мы принимает базу данных, но для этого мы подключали его в auth.module.ts
// получение старого юзера по mail 14-19
    async register(dto: AuthDto) {
        const oldUser = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            } 
        })
// если юзер существует, возвращаем ошибку
        if(oldUser) throw new BadRequestException('User already exists') // отвечает за ошибки в nest
// с помощью метода create - генерируем  юзера 
        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                name: faker.name.firstName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number('+7##########'),
                // библиотека argon2 хеширует данные пароля
                password: await hash(dto.password),
            }
        })
// tokens - мы генерируем тут два токена, инициализируем и возвращаем 
        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            tokens
        }
    }
    // тут храняться токены, которые будут храниться час и 7 дней 
    private async issueTokens(userId: number)   {
        const data = {id: userId}   
// accessToken - это токен, который позволяет нам делать запросы на сервер уже авторизированным 
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        })
// refreshToken - это токен, который перезаписывает наш первый токен 
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        })
        return {accessToken, refreshToken}
    }

    // описываем поля, чтобы описать возвращаемые поля, чтобы они были одинаковы  и для регистрации, и для логина
    private  returnUserFields(user: User) {
        return{
            id:user.id,
            email:user.email,

        }
    }
    } 


