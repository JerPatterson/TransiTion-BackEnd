import { Injectable } from '@nestjs/common';
import { Calendar } from 'src/entities/Calendar';
import { CalendarDate } from 'src/entities/CalendarDate';
import { CalendarDateDto, CalendarDto } from 'src/static/utils/dtos';

@Injectable()
export class ServiceService {
  async getCalendar(agencyId: string) {
    return Calendar.find({ where: { agency_id: agencyId } });
  }

  async getCalendarDates(agencyId: string) {
    return CalendarDate.find({ where: { agency_id: agencyId } });
  }

  async updateCalendar(agencyId: string, calendarDto: CalendarDto) {
    const calendar = Calendar.create({ ...calendarDto, agency_id: agencyId });
    return Calendar.save(calendar);
  }

  async updateCalendarDate(agencyId: string, calendarDateDto: CalendarDateDto) {
    const calendarDate = CalendarDate.create({
      ...calendarDateDto,
      agency_id: agencyId,
    });
    return CalendarDate.save(calendarDate);
  }
}
