import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Stop } from 'src/entities/Stop';
import { Time } from 'src/entities/Time';
import { Trip } from 'src/entities/Trip';
import { DateDto, TimeDto } from 'src/static/utils/dtos';
import { TripService } from '../trip/trip.service';

@Injectable()
export class TimeService {
  constructor(private tripService: TripService) {}

  async getTimesByTripId(agencyId: string, tripId: string) {
    return Time.find({
      where: { trip_id: tripId, agency_id: agencyId },
      relations: { stop: true },
      select: {
        arrival_time: true,
        departure_time: true,
        pickup_type: true,
        drop_off_type: true,
        stop: {
          stop_id: true,
          stop_lat: true,
          stop_lon: true,
          stop_shelter: true,
        },
      },
      order: { stop_sequence: 'ASC' },
    });
  }

  async getTodayTimesFromRoute(agencyId: string, routeId: string) {
    return this.getTimesFromTrips(
      agencyId,
      await this.tripService.getTodayTripsFromRoute(agencyId, routeId),
    );
  }

  async getYesterdayTimesFromRoute(agencyId: string, routeId: string) {
    return this.getTimesFromTrips(
      agencyId,
      await this.tripService.getYesterdayTripsFromRoute(agencyId, routeId),
    );
  }

  async getTomorrowTimesFromRoute(agencyId: string, routeId: string) {
    return this.getTimesFromTrips(
      agencyId,
      await this.tripService.getTomorrowTripsFromRoute(agencyId, routeId),
    );
  }

  async getDateTimesFromRoute(
    agencyId: string,
    routeId: string,
    dateDto: DateDto,
  ) {
    return this.getTimesFromTrips(
      agencyId,
      await this.tripService.getDateTripsFromRoute(agencyId, routeId, dateDto),
    );
  }

  async updateTime(agencyId: string, timeDto: TimeDto) {
    const time = Time.create({ ...timeDto });
    time.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    time.stop = await Stop.findOne({
      where: { stop_id: timeDto.stop_id, agency_id: agencyId },
    });
    time.trip = await Trip.findOne({
      where: { trip_id: timeDto.trip_id, agency_id: agencyId },
    });
    return Time.save(time);
  }

  private async getTimesFromTrips(agencyId: string, trips: Trip[]) {
    return (
      await Promise.all(
        trips.map(
          async (trip) => await this.getTimesByTripId(agencyId, trip.trip_id),
        ),
      )
    ).sort((a, b) => {
      return (
        Number(a[0].arrival_time.slice(0, 2) + a[0].arrival_time.slice(3, 5)) -
        Number(b[0].arrival_time.slice(0, 2) + b[0].arrival_time.slice(3, 5))
      );
    });
  }
}
