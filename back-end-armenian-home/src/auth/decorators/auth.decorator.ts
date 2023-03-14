import {UseGuards} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'

export const Auth = () => UseGuards(AuthGuard('jwt'))
// мы создаем Auth, в которой находится стрелочная функция и просто возвращаем  UseGuards(AuthGuard('jwt'))