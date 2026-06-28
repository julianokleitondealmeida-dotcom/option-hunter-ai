import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
