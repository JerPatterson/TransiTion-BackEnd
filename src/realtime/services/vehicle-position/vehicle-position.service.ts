import { Injectable } from '@nestjs/common';
import { FeedManagerFactoryService } from 'src/realtime/services/feed-factory/feed-manager-factory.service';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

@Injectable()
export class VehiclePositionService {
  constructor(private feedManagerFactoryService: FeedManagerFactoryService) {}

  async getVehiclePositions(
    agencyId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition[]> {
    return this.feedManagerFactoryService
      .getFeedManagerByAgencyId(agencyId)
      ?.getVehiclePositions();
  }

  async getVehiclePositionById(
    agencyId: string,
    vehicleId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition> {
    return this.feedManagerFactoryService
      .getFeedManagerByAgencyId(agencyId)
      ?.getVehiclePositionById(vehicleId);
  }

  async getVehiclePositionsFromRoute(
    agencyId: string,
    routeId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition[]> {
    return this.feedManagerFactoryService
      .getFeedManagerByAgencyId(agencyId)
      ?.getVehiclePositionsFromRoute(routeId);
  }
}
