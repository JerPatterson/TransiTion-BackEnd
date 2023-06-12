import { Injectable } from '@nestjs/common';
import { Stop } from 'src/entities/Stop';
import { Time } from 'src/entities/Time';
import { Trip } from 'src/entities/Trip';
import { TimeDto } from 'src/static/utils/dtos';

@Injectable()
export class TimeService {
  async getTimesFromAgencyByTripId(agencyId: string, tripId: string) {
    return Time.find({
      where: { trip_id: tripId, agency_id: agencyId },
    });
  }

  async updateTime(agencyId: string, timeDto: TimeDto) {
    const time = Time.create({ ...timeDto, agency_id: agencyId });
    time.stop = await Stop.findOne({ where: { stop_id: timeDto.stop_id } });
    time.trip = await Trip.findOne({ where: { trip_id: timeDto.trip_id } });
    return Time.save(time);
  }
}
