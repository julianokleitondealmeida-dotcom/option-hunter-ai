import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  getApiInfo() {
    return {
      name: 'Option Hunter AI API',
      version: '0.1.0',
      description: 'Intelligent options analysis platform',
      documentation: '/api',
      github: 'https://github.com/julianokleitondealmeida-dotcom/option-hunter-ai',
    };
  }
}
