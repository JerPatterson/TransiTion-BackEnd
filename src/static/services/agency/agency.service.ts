import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { AgencyDto } from 'src/static/utils/dtos';

@Injectable()
export class AgencyService {
  getAgencies() {
    return Agency.find();
  }

  getAgencyById(id: string) {
    return Agency.findOne({ where: { id } });
  }

  createAgency(agency: AgencyDto) {
    return Agency.save(Agency.create({ ...agency }));
  }
}
