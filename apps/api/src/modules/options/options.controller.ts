import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OptionsService } from './options.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('options')
@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Get(':symbol/chain')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get options chain for an asset' })
  async getChain(@Param('symbol') symbol: string) {
    return this.optionsService.getOptionChain(symbol);
  }

  @Get(':symbol/calls')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get call options' })
  @ApiQuery({ name: 'expiration', required: true, type: String })
  async getCalls(
    @Param('symbol') symbol: string,
    @Query('expiration') expiration: string,
  ) {
    return this.optionsService.getCallsByStrike(symbol, new Date(expiration));
  }

  @Get(':symbol/puts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get put options' })
  @ApiQuery({ name: 'expiration', required: true, type: String })
  async getPuts(
    @Param('symbol') symbol: string,
    @Query('expiration') expiration: string,
  ) {
    return this.optionsService.getPutsByStrike(symbol, new Date(expiration));
  }
}
