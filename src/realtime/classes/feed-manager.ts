import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { FeedInfo } from 'src/realtime/feed/feed-info';

export abstract class FeedManager {
  constructor(protected feed: FeedInfo) {}

  abstract getVehiclePositions(): Promise<
    GtfsRealtimeBindings.transit_realtime.IVehiclePosition[]
  >;

  abstract getVehiclePositionById(
    vehicleId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition>;

  abstract getVehiclePositionsFromRoute(
    routeId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition[]>;

  // TODO
  // abstract getTripUpdates(): TripUpdate[];
  // abstract getTripUpdateById(tripId: string): TripUpdate;
  // abstract getTripUpdatesFromRoute(routeId: string): TripUpdate[];
}
