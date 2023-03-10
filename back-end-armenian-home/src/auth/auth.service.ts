import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {} // мы принимает базу данных, но для этого мы подключали его в auth.module.ts

    async register(dto: AuthDto) {
        const oldUser = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            } 
        })

        if(oldUser) throw new BadRequestException('User already exists') // отвечает за ошибки в nest

        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                name: faker.name.findName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number('+7##########'),
                password: await hash(dto.password),
            }
        })
        return user
    }
    private async issueTokens(userId: number)   {
        const data = {id: userId}   

        // const accessToken = this.jwtService.sign(data, {
            
        // })
    }
}

