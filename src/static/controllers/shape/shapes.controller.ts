import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ShapeService } from 'src/static/services/shape/shape.service';
import { ShapeDto } from 'src/static/utils/dtos';

@Controller('shapes')
export class ShapeController {
  constructor(private shapeService: ShapeService) {}

  @Get('/:agencyId/:shapeId')
  async getStopFromAgencyById(
    @Param('agencyId') agencyId: string,
    @Param('shapeId') shapeId: string,
  ) {
    try {
      return await this.shapeService.getShapesById(agencyId, shapeId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/:agencyId')
  async updateStop(
    @Param('agencyId') agencyId: string,
    @Body() shapes: ShapeDto[],
  ) {
    try {
      shapes.forEach(async (shape_point) => {
        await this.shapeService.updateShape(agencyId, shape_point);
      });
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
