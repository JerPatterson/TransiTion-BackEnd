import { Injectable } from '@nestjs/common';
import { ShapesDto } from 'src/static/utils/dtos';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ShapeService {
  constructor(private databaseService: DatabaseService) {}

  async getShapes(agencyId: string) {
    return this.databaseService.shapesCollection
      .find(
        { agency_id: agencyId },
        {
          projection: { _id: 0 },
          sort: { shape_id: 1 },
        },
      )
      .toArray();
  }

  async getShapesById(agencyId: string, shapeId: string) {
    return (
      await this.databaseService.shapesCollection
        .find(
          { agency_id: agencyId, shape_id: shapeId },
          { projection: { _id: 0 } },
        )
        .toArray()
    ).pop();
  }

  async updateShape(shapesDto: ShapesDto) {
    this.databaseService.shapesCollection.updateOne(
      { agency_id: shapesDto.agency_id, shape_id: shapesDto.shape_id },
      { $set: shapesDto },
      { upsert: true },
    );
  }
}
