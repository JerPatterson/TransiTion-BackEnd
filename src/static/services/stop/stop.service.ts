import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Stop } from 'src/entities/Stop';
import { AreaDto, StopDto } from 'src/static/utils/dtos';
import { Between } from 'typeorm';

@Injectable()
export class StopService {
  async getStops(agencyId: string) {
    return Stop.find({ where: { agency_id: agencyId } });
  }

  async getStopsFromArea(area: AreaDto) {
    return Stop.find({
      where: {
        stop_lat: Between(area.minLat, area.maxLat),
        stop_lon: Between(area.minLon, area.maxLon),
      },
      select: {
        agency_id: true,
        stop_id: true,
        stop_lat: true,
        stop_lon: true,
      },
    });
  }

  async getStopById(agencyId: string, stopId: string) {
    return Stop.findOne({
      where: { stop_id: stopId, agency_id: agencyId },
    });
  }

  async updateStop(agencyId: string, stopDto: StopDto) {
    const stop = Stop.create({ ...stopDto });
    stop.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    return Stop.save(stop);
  }
}
