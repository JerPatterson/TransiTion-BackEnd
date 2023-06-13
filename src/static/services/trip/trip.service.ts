import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Route } from 'src/entities/Route';
import { Trip } from 'src/entities/Trip';
import { TripDto } from 'src/static/utils/dtos';

@Injectable()
export class TripService {
  async getTrips(agencyId: string) {
    return Trip.find({
      where: { agency_id: agencyId },
      select: {
        route_id: true,
        trip_id: true,
        service_id: true,
      },
    });
  }

  async getTripById(agencyId: string, tripId: string) {
    return Trip.findOne({
      where: { trip_id: tripId, agency: { agency_id: agencyId } },
    });
  }

  async updateTrip(agencyId: string, tripDto: TripDto) {
    const trip = Trip.create({ ...tripDto, agency: { agency_id: agencyId } });
    trip.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    trip.route = await Route.findOne({
      where: { route_id: tripDto.route_id, agency: { agency_id: agencyId } },
    });
    return Trip.save(trip);
  }
}
