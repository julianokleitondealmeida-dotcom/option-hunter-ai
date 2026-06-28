import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search assets' })
  @ApiQuery({ name: 'q', required: true, description: 'Search query' })
  @ApiQuery({ name: 'market', required: false, enum: ['BR', 'US'] })
  async searchAssets(@Query('q') query: string, @Query('market') market?: string) {
    return this.assetsService.searchAssets(query, market);
  }

  @Get(':symbol')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get asset by symbol' })
  async getAsset(@Param('symbol') symbol: string) {
    return this.assetsService.getAssetBySymbol(symbol);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all assets' })
  @ApiQuery({ name: 'market', required: false, enum: ['BR', 'US'] })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit of results' })
  async getAllAssets(
    @Query('market') market?: string,
    @Query('limit') limit: number = 50,
  ) {
    return this.assetsService.getAllAssets(market, limit);
  }
}
