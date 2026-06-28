import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Post('options/:id/greeks')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calculate Greeks for an option' })
  async calculateGreeks(@Param('id') id: string) {
    return this.analyticsService.calculateGreeks(id);
  }

  @Post('options/:id/probability')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calculate probability for an option' })
  async calculateProbability(@Param('id') id: string) {
    return this.analyticsService.calculateProbability(id);
  }
}
