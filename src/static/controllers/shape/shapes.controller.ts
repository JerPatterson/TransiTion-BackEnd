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

  @Get('/:agencyId')
  async getShapes(@Param('agencyId') agencyId: string) {
    try {
      return await this.shapeService.getShapes(agencyId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:agencyId/:shapeId')
  async getShapesById(
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
