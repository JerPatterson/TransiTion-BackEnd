import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ServiceService } from 'src/static/services/service/service.service';
import { CalendarDateDto, CalendarDto, DateDto } from 'src/static/utils/dtos';

@Controller('services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Get('yesterday/:agencyId')
  async getYesterdayServiceIds(@Param('agencyId') agencyId: string) {
    try {
      return await this.serviceService.getYesterdayServiceIds(agencyId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('today/:agencyId')
  async getTodayServiceIds(@Param('agencyId') agencyId: string) {
    try {
      return await this.serviceService.getTodayServiceIds(agencyId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('tomorrow/:agencyId')
  async getTomorrowServiceIds(@Param('agencyId') agencyId: string) {
    try {
      return await this.serviceService.getTomorrowServiceIds(agencyId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('date/:agencyId')
  async getDateServiceIds(
    @Param('agencyId') agencyId: string,
    @Body() dateDto: DateDto,
  ) {
    try {
      return await this.serviceService.getDateServiceIds(agencyId, dateDto);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/calendar/:agencyId')
  async getCalendar(@Param('agencyId') agencyId: string) {
    try {
      return await this.serviceService.getCalendar(agencyId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/calendar/dates/:agencyId')
  async getCalendarDates(@Param('agencyId') agencyId: string) {
    try {
      return await this.serviceService.getCalendarDates(agencyId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/calendar/:agencyId')
  async updateCalendar(
    @Param('agencyId') agencyId: string,
    @Body() calendar: CalendarDto,
  ) {
    try {
      return await this.serviceService.updateCalendar(agencyId, calendar);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/calendar/dates/:agencyId')
  async updateCalendarDate(
    @Param('agencyId') agencyId: string,
    @Body() calendarDate: CalendarDateDto,
  ) {
    try {
      return await this.serviceService.updateCalendarDate(
        agencyId,
        calendarDate,
      );
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
