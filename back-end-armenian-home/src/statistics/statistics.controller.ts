import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CurrectUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main')
  @Auth()
  getMainStatistics(@CurrectUser('id') id: number)
  {
    return this.statisticsService.getMain(id)
  }
}
