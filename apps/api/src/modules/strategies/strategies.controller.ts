import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { StrategiesService } from './strategies.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('strategies')
@Controller('strategies')
export class StrategiesController {
  constructor(private strategiesService: StrategiesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all strategies' })
  @ApiQuery({ name: 'type', required: false, enum: ['bullish', 'bearish', 'neutral', 'volatility'] })
  async getStrategies(@Query('type') type?: string) {
    if (type) {
      return this.strategiesService.getStrategiesByType(type);
    }
    return this.strategiesService.getAllStrategies();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get strategy by ID' })
  async getStrategy(@Param('id') id: string) {
    return this.strategiesService.getStrategyById(id);
  }
}
