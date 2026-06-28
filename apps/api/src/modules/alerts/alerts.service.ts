import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class AlertsService {
  private logger = new Logger('AlertsService');

  constructor(private prismaService: PrismaService) {}

  async getAlerts(userId: string) {
    this.logger.log(`Getting alerts for user: ${userId}`);

    try {
      const alerts = await this.prismaService.alert.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return alerts;
    } catch (error) {
      this.logger.error(`Error getting alerts: ${error.message}`);
      throw error;
    }
  }

  async createAlert(userId: string, data: any) {
    this.logger.log(`Creating alert for user: ${userId}`);

    try {
      const alert = await this.prismaService.alert.create({
        data: {
          userId,
          ...data,
        },
      });

      return alert;
    } catch (error) {
      this.logger.error(`Error creating alert: ${error.message}`);
      throw error;
    }
  }
}
