import { Injectable } from '@nestjs/common';
import { Route } from 'src/entities/Route';
import { Trip } from 'src/entities/Trip';
import { TripDto } from 'src/static/utils/dtos';

@Injectable()
export class TripService {
  async getTripsFromAgency(agencyId: string) {
    return Trip.find({ where: { agency_id: agencyId } });
  }

  async getTripFromAgencyById(agencyId: string, tripId: string) {
    return Trip.findOne({
      where: { trip_id: tripId, agency_id: agencyId },
    });
  }

  async updateTrip(agencyId: string, tripDto: TripDto) {
    const trip = Trip.create({ ...tripDto, agency_id: agencyId });
    trip.route = await Route.findOne({ where: { route_id: tripDto.route_id } });
    return Trip.save(trip);
  }
}
