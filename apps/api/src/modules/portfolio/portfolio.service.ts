import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class PortfolioService {
  private logger = new Logger('PortfolioService');

  constructor(private prismaService: PrismaService) {}

  async getUserPortfolio(userId: string) {
    this.logger.log(`Getting portfolio for user: ${userId}`);

    try {
      const portfolio = await this.prismaService.portfolio.findFirst({
        where: { userId },
        include: { positions: true },
      });

      return portfolio;
    } catch (error) {
      this.logger.error(`Error getting portfolio: ${error.message}`);
      throw error;
    }
  }

  async createPortfolio(userId: string) {
    this.logger.log(`Creating portfolio for user: ${userId}`);

    try {
      const portfolio = await this.prismaService.portfolio.create({
        data: {
          userId,
          totalValue: 0,
        },
      });

      return portfolio;
    } catch (error) {
      this.logger.error(`Error creating portfolio: ${error.message}`);
      throw error;
    }
  }
}
