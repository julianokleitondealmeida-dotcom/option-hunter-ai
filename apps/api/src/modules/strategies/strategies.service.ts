import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class StrategiesService {
  private logger = new Logger('StrategiesService');

  constructor(private prismaService: PrismaService) {}

  async getAllStrategies() {
    this.logger.log('Getting all strategies');

    try {
      const strategies = await this.prismaService.strategy.findMany();
      return strategies;
    } catch (error) {
      this.logger.error(`Error getting strategies: ${error.message}`);
      throw error;
    }
  }

  async getStrategiesByType(type: string) {
    this.logger.log(`Getting strategies by type: ${type}`);

    try {
      const strategies = await this.prismaService.strategy.findMany({
        where: { type },
      });
      return strategies;
    } catch (error) {
      this.logger.error(`Error getting strategies: ${error.message}`);
      throw error;
    }
  }

  async getStrategyById(id: string) {
    this.logger.log(`Getting strategy: ${id}`);

    try {
      const strategy = await this.prismaService.strategy.findUnique({
        where: { id },
      });
      return strategy;
    } catch (error) {
      this.logger.error(`Error getting strategy: ${error.message}`);
      throw error;
    }
  }
}
