import {
  Body,
  Controller,
  // Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { TimeService } from 'src/static/services/time/time.service';
import { /* DateDto, */ TimeDto } from 'src/static/utils/dtos';

@Controller('times')
export class TimeController {
  constructor(private timeService: TimeService) {}

  // @Get('/:agencyId/:tripId')
  // async getStopFromAgencyById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('tripId') tripId: string,
  // ) {
  //   try {
  //     return await this.timeService.getTimesByTripId(agencyId, tripId);
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/route/today/:agencyId/:routeId')
  // async getRouteTodayTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('routeId') routeId: string,
  // ) {
  //   try {
  //     return await this.timeService.getTodayTimesFromRoute(agencyId, routeId);
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/route/yesterday/:agencyId/:routeId')
  // async getRouteYesterdayTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('routeId') routeId: string,
  // ) {
  //   try {
  //     return await this.timeService.getYesterdayTimesFromRoute(
  //       agencyId,
  //       routeId,
  //     );
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/route/tomorrow/:agencyId/:routeId')
  // async getRouteTomorrowTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('routeId') routeId: string,
  // ) {
  //   try {
  //     return await this.timeService.getTomorrowTimesFromRoute(
  //       agencyId,
  //       routeId,
  //     );
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/route/date/:agencyId/:routeId')
  // async getRouteDateTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('routeId') routeId: string,
  //   @Body() dateDto: DateDto,
  // ) {
  //   try {
  //     return await this.timeService.getDateTimesFromRoute(
  //       agencyId,
  //       routeId,
  //       dateDto,
  //     );
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/stop/today/:agencyId/:stopId')
  // async getStopTodayTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('stopId') stopId: string,
  // ) {
  //   try {
  //     return await this.timeService.getTodayTimesFromStop(agencyId, stopId);
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/stop/yesterday/:agencyId/:stopId')
  // async getStopYesterdayTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('stopId') stopId: string,
  // ) {
  //   try {
  //     return await this.timeService.getYesterdayTimesFromStop(agencyId, stopId);
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/stop/tomorrow/:agencyId/:stopId')
  // async getStopTomorrowTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('stopId') stopId: string,
  // ) {
  //   try {
  //     return await this.timeService.getTomorrowTimesFromStop(agencyId, stopId);
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/stop/date/:agencyId/:stopId')
  // async getStopDateTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('stopId') stopId: string,
  //   @Body() dateDto: DateDto,
  // ) {
  //   try {
  //     return await this.timeService.getDateTimesFromStop(
  //       agencyId,
  //       stopId,
  //       dateDto,
  //     );
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/route/stop/today/:agencyId/:routeId/:stopId')
  // async getRouteStopTodayTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('routeId') routeId: string,
  //   @Param('stopId') stopId: string,
  // ) {
  //   try {
  //     return await this.timeService.getTodayTimesFromRouteStop(
  //       agencyId,
  //       routeId,
  //       stopId,
  //     );
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/route/stop/yesterday/:agencyId/:routeId/:stopId')
  // async getRouteStopYesterdayTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('routeId') routeId: string,
  //   @Param('stopId') stopId: string,
  // ) {
  //   try {
  //     return await this.timeService.getYesterdayTimesFromRouteStop(
  //       agencyId,
  //       routeId,
  //       stopId,
  //     );
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/route/stop/tomorrow/:agencyId/:routeId/:stopId')
  // async getRouteStopTomorrowTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('routeId') routeId: string,
  //   @Param('stopId') stopId: string,
  // ) {
  //   try {
  //     return await this.timeService.getTomorrowTimesFromRouteStop(
  //       agencyId,
  //       routeId,
  //       stopId,
  //     );
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('/route/stop/date/:agencyId/:routeId/:stopId')
  // async getRouteStopDateTimesById(
  //   @Param('agencyId') agencyId: string,
  //   @Param('routeId') routeId: string,
  //   @Param('stopId') stopId: string,
  //   @Body() dateDto: DateDto,
  // ) {
  //   try {
  //     return await this.timeService.getDateTimesFromRouteStop(
  //       agencyId,
  //       routeId,
  //       stopId,
  //       dateDto,
  //     );
  //   } catch {
  //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Put('/:agencyId')
  async updateStop(
    @Param('agencyId') agencyId: string,
    @Body() times: TimeDto[],
  ) {
    try {
      if (agencyId) await this.timeService.updateTime(times);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
