import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Stop } from 'src/entities/Stop';
import { StopDto } from 'src/static/utils/dtos';

@Injectable()
export class StopService {
  getStopsFromAgency(agencyId: string) {
    return Stop.find({
      where: {
        agency: { id: agencyId },
      },
      relations: { agency: true },
    });
  }

  getStopFromAgencyById(agencyId: string, stopId: string) {
    return Stop.findOne({
      where: {
        id: stopId,
        agency: { id: agencyId },
      },
      relations: { agency: true },
    });
  }

  async createStop(agencyId: string, stopDto: StopDto) {
    const stop: Stop = Stop.create({ ...stopDto });
    stop.agency = await Agency.findOne({ where: { id: agencyId } });
    return Stop.save(stop);
  }
}
