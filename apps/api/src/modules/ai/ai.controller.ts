import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('analyze-strategy')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Analyze a strategy using AI' })
  async analyzeStrategy(@Body() data: any) {
    return this.aiService.analyzeStrategy(data.strategyId);
  }

  @Post('find-opportunities')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find trading opportunities' })
  async findOpportunities(@Body() userProfile: any) {
    return this.aiService.findOpportunities(userProfile);
  }
}
