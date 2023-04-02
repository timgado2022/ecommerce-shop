import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrectUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from './review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // get-запрос получение всех 
  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  // post-запрос для оставление отзыва
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:productId')
  @Auth()
  async leaveReview(@CurrectUser('id') id:number, @Body() dto: ReviewDto, @Param('productId') productId: string) {
    return this.reviewService.create(id, dto, +productId);
    
  }
}