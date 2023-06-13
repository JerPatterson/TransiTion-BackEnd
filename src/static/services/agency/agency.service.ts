import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { AgencyDto } from 'src/static/utils/dtos';

@Injectable()
export class AgencyService {
  async getAgencies() {
    return Agency.find();
  }

  async getAgencyById(id: string) {
    return Agency.findOne({ where: { agency_id: id } });
  }

  async updateAgency(agency: AgencyDto) {
    return Agency.save(Agency.create({ ...agency }));
  }
}
