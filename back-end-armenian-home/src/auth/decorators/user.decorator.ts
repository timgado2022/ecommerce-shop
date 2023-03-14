// user decorator - нужен для того, чтобы мы могли получать данные текущего юзера, к примеру, чтобы получить email того человека, кто сейчас находится в системе

import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {User} from "@prisma/client";


// берем CurrectUser, присваиваем ей значение из import дальше стрелочная функция 
export const CurrectUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user[data] : user; // из-за того, что мы не знаем, что пользователь от нас будет хотеть, мы должны перевести все в динамику, т.е user[динамичные данные]
        // поэтому мы в data прописываем все ключи, которые мы давали User 
    }
)
// из официального сайта nest 