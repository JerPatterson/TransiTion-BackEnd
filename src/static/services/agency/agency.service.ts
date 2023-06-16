import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { AgencyDto } from 'src/static/utils/dtos';

@Injectable()
export class AgencyService {
  async getAgencies() {
    return Agency.find();
  }

  async getAgencyById(id: string) {
    return Agency.findOne({
      where: { agency_id: id },
      select: {
        agency_id: true,
        agency_name: true,
        agency_url: true,
        agency_timezone: true,
        agency_lang: true,
        agency_fare_url: true,
        agency_phone: true,
        agency_email: true,
      },
    });
  }

  async updateAgency(agency: AgencyDto) {
    return Agency.save(Agency.create({ ...agency }));
  }
}
