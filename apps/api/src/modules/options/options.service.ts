import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class OptionsService {
  private logger = new Logger('OptionsService');

  constructor(private prismaService: PrismaService) {}

  async getOptionChain(assetSymbol: string) {
    this.logger.log(`Getting option chain for: ${assetSymbol}`);

    try {
      const options = await this.prismaService.option.findMany({
        where: { asset: { symbol: assetSymbol.toUpperCase() } },
        include: { asset: true },
        orderBy: [{ expirationDate: 'asc' }, { strikePrice: 'asc' }],
      });

      return options;
    } catch (error) {
      this.logger.error(`Error getting option chain: ${error.message}`);
      throw error;
    }
  }

  async getOptionsByExpiration(assetSymbol: string, expirationDate: Date) {
    this.logger.log(`Getting options for ${assetSymbol} expiring on ${expirationDate}`);

    try {
      const options = await this.prismaService.option.findMany({
        where: {
          asset: { symbol: assetSymbol.toUpperCase() },
          expirationDate: new Date(expirationDate),
        },
        orderBy: { strikePrice: 'asc' },
      });

      return options;
    } catch (error) {
      this.logger.error(`Error getting options: ${error.message}`);
      throw error;
    }
  }

  async getCallsByStrike(assetSymbol: string, expirationDate: Date) {
    this.logger.log(`Getting calls for ${assetSymbol}`);

    try {
      const options = await this.prismaService.option.findMany({
        where: {
          asset: { symbol: assetSymbol.toUpperCase() },
          type: 'CALL',
          expirationDate: new Date(expirationDate),
        },
        orderBy: { strikePrice: 'asc' },
      });

      return options;
    } catch (error) {
      this.logger.error(`Error getting calls: ${error.message}`);
      throw error;
    }
  }

  async getPutsByStrike(assetSymbol: string, expirationDate: Date) {
    this.logger.log(`Getting puts for ${assetSymbol}`);

    try {
      const options = await this.prismaService.option.findMany({
        where: {
          asset: { symbol: assetSymbol.toUpperCase() },
          type: 'PUT',
          expirationDate: new Date(expirationDate),
        },
        orderBy: { strikePrice: 'asc' },
      });

      return options;
    } catch (error) {
      this.logger.error(`Error getting puts: ${error.message}`);
      throw error;
    }
  }
}
