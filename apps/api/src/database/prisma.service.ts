import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('PrismaService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected successfully');
  }

  async enableShutdownHooks(app: any) {
    this.$on('beforeExit', async () => {
      this.logger.log('Disconnecting database...');
      await app.close();
    });
  }
}
