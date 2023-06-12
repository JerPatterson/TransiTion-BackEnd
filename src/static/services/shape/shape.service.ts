import { Injectable } from '@nestjs/common';
import { Shape } from 'src/entities/Shape';
import { Trip } from 'src/entities/Trip';
import { ShapeDto } from 'src/static/utils/dtos';

@Injectable()
export class ShapeService {
  async getShapesById(agencyId: string, shapeId: string) {
    return Shape.find({
      where: { shape_id: shapeId, agency_id: agencyId },
    });
  }

  async updateShape(agencyId: string, ShapeDto: ShapeDto) {
    const shape = Shape.create({ ...ShapeDto, agency_id: agencyId });
    shape.trip = await Trip.findOne({ where: { shape_id: ShapeDto.shape_id } });
    return Shape.save(Shape);
  }
}
