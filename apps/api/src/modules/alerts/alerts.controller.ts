import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AlertsService } from './alerts.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user alerts' })
  async getAlerts(@CurrentUser() user: any) {
    return this.alertsService.getAlerts(user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create alert' })
  async createAlert(@CurrentUser() user: any, @Body() data: any) {
    return this.alertsService.createAlert(user.id, data);
  }
}
