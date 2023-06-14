import { Injectable } from '@nestjs/common';
import { Calendar } from 'src/entities/Calendar';
import { CalendarDate } from 'src/entities/CalendarDate';
import { ONE_SEC_IN_MS, SECONDS_IN_DAY } from 'src/static/utils/constants';
import { CalendarDateDto, CalendarDto, DateDto } from 'src/static/utils/dtos';
import { Day, ServiceExceptionType } from 'src/static/utils/enums';
import { AgencyService } from '../agency/agency.service';
import { Agency } from 'src/entities/Agency';

@Injectable()
export class ServiceService {
  constructor(private agencyService: AgencyService) {}

  async getCalendar(agencyId: string) {
    return Calendar.find({ where: { agency_id: agencyId } });
  }

  async getCalendarDates(agencyId: string) {
    return CalendarDate.find({ where: { agency_id: agencyId } });
  }

  async getTodayServiceIds(agencyId: string): Promise<string[]> {
    const agency = await this.agencyService.getAgencyById(agencyId);
    return this.getServiceIds(
      agencyId,
      this.getCurrrentDate(agency.agency_timezone),
    );
  }

  async getYesterdayServiceIds(agencyId: string): Promise<string[]> {
    const agency = await this.agencyService.getAgencyById(agencyId);
    return this.getServiceIds(
      agencyId,
      await this.getDateFromCurrentDateOffset(
        this.getCurrrentDate(agency.agency_timezone),
        -SECONDS_IN_DAY * ONE_SEC_IN_MS,
      ),
    );
  }

  async getTomorrowServiceIds(agencyId: string): Promise<string[]> {
    const agency = await this.agencyService.getAgencyById(agencyId);
    return this.getServiceIds(
      agencyId,
      await this.getDateFromCurrentDateOffset(
        this.getCurrrentDate(agency.agency_timezone),
        SECONDS_IN_DAY * ONE_SEC_IN_MS,
      ),
    );
  }

  async getDateServiceIds(
    agencyId: string,
    dateDto: DateDto,
  ): Promise<string[]> {
    const agency = await this.agencyService.getAgencyById(agencyId);
    return this.getServiceIds(
      agencyId,
      this.getDateInTimezone(dateDto, agency.agency_timezone),
    );
  }

  async updateCalendar(agencyId: string, calendarDto: CalendarDto) {
    const calendar = Calendar.create({ ...calendarDto });
    calendar.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    return Calendar.save(calendar);
  }

  async updateCalendarDate(agencyId: string, calendarDateDto: CalendarDateDto) {
    const calendarDate = CalendarDate.create({ ...calendarDateDto });
    calendarDate.agency = await Agency.findOne({
      where: { agency_id: agencyId },
    });
    return CalendarDate.save(calendarDate);
  }

  private getCurrrentDate(timeZone: string) {
    return new Date(new Date().toLocaleString('en-US', { timeZone }));
  }

  private getDateInTimezone(dateDto: DateDto, timeZone: string) {
    return new Date(
      new Date(dateDto.year, dateDto.month, dateDto.day).toLocaleString(
        'en-US',
        { timeZone },
      ),
    );
  }

  private async getDateFromCurrentDateOffset(
    now: Date,
    offset: number,
  ): Promise<Date> {
    return new Date(now.getTime() + offset);
  }

  private async getServiceIds(agencyId: string, date: Date): Promise<string[]> {
    const specialServiceId = await this.checkForException(agencyId, date);
    if (specialServiceId.length) return specialServiceId;
    const serviceId = await this.checkForStandard(agencyId, date);
    return serviceId;
  }

  private async checkForStandard(
    agencyId: string,
    date: Date,
  ): Promise<string[]> {
    const calendar = await this.getCalendar(agencyId);
    return calendar
      .filter((e: Calendar) => {
        return (
          this.isBetweenTwoDates(
            date,
            new Date(Number(e.start_date)),
            new Date(Number(e.end_date)),
          ) && this.isServiceOfDay(e, date.getDay())
        );
      })
      .map((e: Calendar) => e.service_id);
  }

  private async checkForException(
    agencyId: string,
    date: Date,
  ): Promise<string[]> {
    const calendarDates = await this.getCalendarDates(agencyId);
    return calendarDates
      .filter((e: CalendarDate) => {
        return (
          this.isTheSameDate(date, new Date(Number(e.date))) &&
          e.exception_type === ServiceExceptionType.ServiceAddedForTheDate
        );
      })
      .map((e: CalendarDate) => e.service_id);
  }

  private isTheSameDate(a: Date, b: Date) {
    return (
      a.getDay() === b.getDay() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  private isBetweenTwoDates(value: Date, start: Date, end: Date) {
    return start.getTime() < value.getTime() && value.getTime() < end.getTime();
  }

  private isServiceOfDay(
    calendarElement: Calendar,
    dayOfTheWeek: number,
  ): boolean {
    switch (dayOfTheWeek) {
      case Day.Sunday:
        return calendarElement.sunday;
      case Day.Monday:
        return calendarElement.monday;
      case Day.Tuesday:
        return calendarElement.tuesday;
      case Day.Wednesday:
        return calendarElement.wednesday;
      case Day.Thursday:
        return calendarElement.thursday;
      case Day.Friday:
        return calendarElement.friday;
      case Day.Saturday:
        return calendarElement.saturday;
      default:
        return false;
    }
  }
}
