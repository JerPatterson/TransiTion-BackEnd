import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { VehiclePositionService } from 'src/realtime/services/vehicle-position/vehicle-position.service';

@Controller('vehicles')
export class VehiclePositionController {
  constructor(private vehiclePositionService: VehiclePositionService) {}

  @Get('/:agencyId')
  async getVehiclePositions(@Param('agencyId') agencyId: string) {
    try {
      return await this.vehiclePositionService.getVehiclePositions(agencyId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:agencyId/:vehicleId')
  async getVehiclePositionById(
    @Param('agencyId') agencyId: string,
    @Param('vehicleId') vehicleId: string,
  ) {
    try {
      return await this.vehiclePositionService.getVehiclePositionById(
        agencyId,
        vehicleId,
      );
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/route/:agencyId/:routeId')
  async getVehiclePositionsFromRoute(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.vehiclePositionService.getVehiclePositionsFromRoute(
        agencyId,
        routeId,
      );
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
