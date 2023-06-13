import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ServiceService } from 'src/static/services/service/service.service';
import { CalendarDateDto, CalendarDto } from 'src/static/utils/dtos';

@Controller('services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Put('/calendar/:agencyId')
  async updateCalendar(
    @Param('agencyId') agencyId: string,
    @Body() calendar: CalendarDto,
  ) {
    try {
      await this.serviceService.updateCalendar(agencyId, calendar);
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
      await this.serviceService.updateCalendarDate(agencyId, calendarDate);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
