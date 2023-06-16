import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Shape } from 'src/entities/Shape';
import { Trip } from 'src/entities/Trip';
import { ShapeDto } from 'src/static/utils/dtos';

@Injectable()
export class ShapeService {
  async getShapes(agencyId: string) {
    return Shape.find({
      where: { agency_id: agencyId },
      order: { shape_id: 'ASC', shape_pt_sequence: 'ASC' },
      select: {
        shape_pt_lat: true,
        shape_pt_lon: true,
        shape_pt_sequence: true,
      },
    });
  }

  async getShapesById(agencyId: string, shapeId: string) {
    return Shape.find({
      where: { shape_id: shapeId, agency_id: agencyId },
      order: { shape_pt_sequence: 'ASC' },
      select: {
        shape_pt_lat: true,
        shape_pt_lon: true,
        shape_pt_sequence: true,
        shape_dist_traveled: true,
      },
    });
  }

  async updateShape(agencyId: string, shapeDto: ShapeDto) {
    const shape = Shape.create({ ...shapeDto });
    shape.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    shape.trip = await Trip.findOne({ where: { shape_id: shapeDto.shape_id } });
    return Shape.save(shape);
  }
}
