import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Shape } from 'src/entities/Shape';
import { Trip } from 'src/entities/Trip';
import { ShapeDto } from 'src/static/utils/dtos';

@Injectable()
export class ShapeService {
  async getShapesById(agencyId: string, shapeId: string) {
    return Shape.find({
      where: { shape_id: shapeId, agency: { agency_id: agencyId } },
      order: { shape_pt_sequence: 'ASC' },
    });
  }

  async updateShape(agencyId: string, shapeDto: ShapeDto) {
    const shape = Shape.create({ ...shapeDto });
    shape.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    shape.trip = await Trip.findOne({ where: { shape_id: shapeDto.shape_id } });
    return Shape.save(shape);
  }
}
