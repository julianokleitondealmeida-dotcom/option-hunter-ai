import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user portfolio' })
  async getPortfolio(@CurrentUser() user: any) {
    return this.portfolioService.getUserPortfolio(user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create portfolio' })
  async createPortfolio(@CurrentUser() user: any) {
    return this.portfolioService.createPortfolio(user.id);
  }
}
