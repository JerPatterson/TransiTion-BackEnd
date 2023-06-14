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

  async getFullAgencyInfoById(id: string) {
    return Agency.createQueryBuilder('agency')
      .leftJoinAndSelect('agency.stops', 'stops')
      .leftJoinAndSelect('agency.routes', 'routes')
      .select([
        'stops.stop_id',
        'stops.stop_lat',
        'stops.stop_lon',
        'routes.route_id',
        'agency.agency_id',
        'agency.agency_name',
        'agency.agency_url',
        'agency.agency_timezone',
        'agency.agency_lang',
        'agency.agency_fare_url',
        'agency.agency_phone',
        'agency.agency_email',
      ])
      .where('agency.agency_id = :id', { id })
      .getOne();
  }

  async updateAgency(agency: AgencyDto) {
    return Agency.save(Agency.create({ ...agency }));
  }
}
