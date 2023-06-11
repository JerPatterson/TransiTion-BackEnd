import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AgencyService } from 'src/static/services/agency/agency.service';
import { AgencyDto } from 'src/static/utils/dtos';

@Controller('agencies')
export class AgencyController {
  constructor(private agencyService: AgencyService) {}

  @Get()
  async getAgencies() {
    return await this.agencyService.getAgencies();
  }

  @Get('/:id')
  async getAgencyById(@Param('id') id: string) {
    return await this.agencyService.getAgencyById(id);
  }

  @Post()
  createAgency(@Body() agency: AgencyDto) {
    this.agencyService.createAgency(agency);
  }
}
