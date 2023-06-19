import { Module } from '@nestjs/common';
import { TripUpdateService } from './services/trip-update/trip-update.service';
import { VehiclePositionService } from './services/vehicle-position/vehicle-position.service';
import { TripUpdateController } from './controllers/trip-update/trip-update.controller';
import { VehiclePositionController } from './controllers/vehicle-position/vehicle-position.controller';
import { FeedManagerFactoryService } from './services/feed-factory/feed-manager-factory.service';

@Module({
  controllers: [TripUpdateController, VehiclePositionController],
  providers: [
    TripUpdateService,
    VehiclePositionService,
    FeedManagerFactoryService,
  ],
})
export class RealtimeModule {}
