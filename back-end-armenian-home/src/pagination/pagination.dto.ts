import { IsOptional, IsString } from "class-validator";


// текущая страница(page)
// сколько элементов на странице
export class PaginationDto {
    @IsOptional()
    @IsString()
    page?: string

    @IsString()
    @IsOptional()
    perPage?: string
}

