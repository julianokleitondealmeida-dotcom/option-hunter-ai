import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AssetsModule } from './modules/assets/assets.module';
import { OptionsModule } from './modules/options/options.module';
import { StrategiesModule } from './modules/strategies/strategies.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    DatabaseModule,
    AuthModule,
    AssetsModule,
    OptionsModule,
    StrategiesModule,
    PortfolioModule,
    AlertsModule,
    AnalyticsModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
