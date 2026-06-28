import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class AssetsService {
  private logger = new Logger('AssetsService');

  constructor(private prismaService: PrismaService) {}

  async searchAssets(query: string, market?: string) {
    this.logger.log(`Searching assets: query=${query}, market=${market}`);

    try {
      const assets = await this.prismaService.asset.findMany({
        where: {
          OR: [
            { symbol: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } },
          ],
          ...(market && { market }),
        },
        take: 10,
      });

      return assets;
    } catch (error) {
      this.logger.error(`Error searching assets: ${error.message}`);
      throw error;
    }
  }

  async getAssetBySymbol(symbol: string) {
    this.logger.log(`Getting asset: ${symbol}`);

    try {
      const asset = await this.prismaService.asset.findUnique({
        where: { symbol: symbol.toUpperCase() },
      });

      return asset;
    } catch (error) {
      this.logger.error(`Error getting asset: ${error.message}`);
      throw error;
    }
  }

  async getAllAssets(market?: string, limit: number = 50) {
    this.logger.log(`Getting all assets: market=${market}, limit=${limit}`);

    try {
      const assets = await this.prismaService.asset.findMany({
        where: market ? { market } : undefined,
        take: limit,
      });

      return assets;
    } catch (error) {
      this.logger.error(`Error getting assets: ${error.message}`);
      throw error;
    }
  }
}
