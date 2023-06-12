import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { AgencyService } from 'src/static/services/agency/agency.service';
import { AgencyDto } from 'src/static/utils/dtos';

@Controller('agencies')
export class AgencyController {
  constructor(private agencyService: AgencyService) {}

  @Get()
  async getAgencies() {
    try {
      return await this.agencyService.getAgencies();
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  async getAgencyById(@Param('id') id: string) {
    try {
      return await this.agencyService.getAgencyById(id);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async createAgency(@Body() agency: AgencyDto) {
    try {
      return await this.agencyService.updateAgency(agency);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
