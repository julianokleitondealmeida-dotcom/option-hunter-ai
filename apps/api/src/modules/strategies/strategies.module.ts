import { Module } from '@nestjs/common';
import { StrategiesController } from './strategies.controller';
import { StrategiesService } from './strategies.service';
import { DatabaseModule } from '@/database/database.module';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [DatabaseModule, OptionsModule],
  controllers: [StrategiesController],
  providers: [StrategiesService],
  exports: [StrategiesService],
})
export class StrategiesModule {}
