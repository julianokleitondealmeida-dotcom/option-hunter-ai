import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 3000;

  // Global middleware
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Option Hunter AI API')
    .setDescription('Intelligent options analysis platform for Brazilian and American markets')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('assets', 'Asset search and quotes')
    .addTag('options', 'Options chains and analysis')
    .addTag('strategies', 'Options strategies')
    .addTag('portfolio', 'Portfolio management')
    .addTag('alerts', 'Alerts and monitoring')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    logger.log(`🚀 Server running on http://localhost:${port}`);
    logger.log(`📚 API Documentation: http://localhost:${port}/api`);
  });
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
