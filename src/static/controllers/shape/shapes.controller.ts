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
import { ShapesDto } from 'src/static/utils/dtos';

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
  async updateShapes(
    @Param('agencyId') agencyId: string,
    @Body() shapes: ShapesDto,
  ) {
    try {
      if (agencyId) await this.shapeService.updateShape(shapes);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
