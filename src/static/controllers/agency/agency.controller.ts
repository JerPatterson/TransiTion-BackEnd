import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
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
      return NotFoundException;
    }
  }

  @Get('/:id')
  async getAgencyById(@Param('id') id: string) {
    try {
      return await this.agencyService.getAgencyById(id);
    } catch {
      return BadRequestException;
    }
  }

  @Post()
  async createAgency(@Body() agency: AgencyDto) {
    try {
      return await this.agencyService.createAgency(agency);
    } catch {
      return BadRequestException;
    }
  }
}
