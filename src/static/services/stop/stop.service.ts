import { Injectable } from '@nestjs/common';
import { Stop } from 'src/entities/Stop';
import { StopDto } from 'src/static/utils/dtos';

@Injectable()
export class StopService {
  async getStops() {
    return Stop.find({
      select: {
        stop_agency_id: true,
        stop_id: true,
        stop_lat: true,
        stop_lon: true,
      },
    });
  }

  async getStopsFromAgency(agencyId: string) {
    return Stop.find({ where: { stop_agency_id: agencyId } });
  }

  async getStopFromAgencyById(agencyId: string, stopId: string) {
    return Stop.findOne({
      where: { stop_id: stopId, stop_agency_id: agencyId },
    });
  }

  async createStop(agencyId: string, stopDto: StopDto) {
    const stop = Stop.create({ ...stopDto, stop_agency_id: agencyId });
    return Stop.save(stop);
  }
}
