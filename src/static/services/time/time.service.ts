import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Stop } from 'src/entities/Stop';
import { Time } from 'src/entities/Time';
import { Trip } from 'src/entities/Trip';
import { TimeDto } from 'src/static/utils/dtos';
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
    const tripsIds = await this.tripService.getTodayTripIdsFromRoute(
      agencyId,
      routeId,
    );
    return (
      await Promise.all(
        tripsIds.map(
          async (tripId) => await this.getTimesByTripId(agencyId, tripId),
        ),
      )
    ).sort((a, b) => {
      return (
        Number(a[0].arrival_time.slice(0, 2) + a[0].arrival_time.slice(3, 5)) -
        Number(b[0].arrival_time.slice(0, 2) + b[0].arrival_time.slice(3, 5))
      );
    });
  }

  async getYesterdayTimesFromRoute(agencyId: string, routeId: string) {
    const tripIds = await this.tripService.getYesterdayTripIdsFromRoute(
      agencyId,
      routeId,
    );
    return (
      await Promise.all(
        tripIds.map(
          async (tripId) => await this.getTimesByTripId(agencyId, tripId),
        ),
      )
    ).sort((a, b) => {
      return (
        Number(a[0].arrival_time.slice(0, 2) + a[0].arrival_time.slice(3, 5)) -
        Number(b[0].arrival_time.slice(0, 2) + b[0].arrival_time.slice(3, 5))
      );
    });
  }

  async getTomorrowTimesFromRoute(agencyId: string, routeId: string) {
    const tripsIds = await this.tripService.getTomorrowTripIdsFromRoute(
      agencyId,
      routeId,
    );
    return (
      await Promise.all(
        tripsIds.map(
          async (tripId) => await this.getTimesByTripId(agencyId, tripId),
        ),
      )
    ).sort((a, b) => {
      return (
        Number(a[0].arrival_time.slice(0, 2) + a[0].arrival_time.slice(3, 5)) -
        Number(b[0].arrival_time.slice(0, 2) + b[0].arrival_time.slice(3, 5))
      );
    });
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
}
