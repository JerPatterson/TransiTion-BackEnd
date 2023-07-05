import { Injectable } from '@nestjs/common';
import { FeedManagerFactoryService } from 'src/realtime/services/feed-factory/feed-manager-factory.service';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

@Injectable()
export class TripUpdateService {
  constructor(private feedManagerFactoryService: FeedManagerFactoryService) {}

  async getTripUpdateById(
    agencyId: string,
    tripId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition> {
    return this.feedManagerFactoryService
      .getFeedManagerByAgencyId(agencyId)
      ?.getTripUpdateById(tripId);
  }

  async getTripUpdatesFromStop(
    agencyId: string,
    stopId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition[]> {
    return this.feedManagerFactoryService
      .getFeedManagerByAgencyId(agencyId)
      ?.getTripUpdateFromStop(stopId);
  }
}
