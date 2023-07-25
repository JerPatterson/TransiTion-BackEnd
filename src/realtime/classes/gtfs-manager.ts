import { FeedManager } from 'src/realtime/classes/feed-manager';
import { FeedInfo } from 'src/realtime/feed/feed-info';
import { ONE_SEC_IN_MS } from 'src/static/utils/constants';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import fetch from 'node-fetch';

export class GtfsManager extends FeedManager {
  private uniqueVehicleIds = new Set<string>();
  private vehiclePositionById = new Map<
    string,
    GtfsRealtimeBindings.transit_realtime.IVehiclePosition
  >();

  private tripUpdateByTripId = new Map<
    string,
    GtfsRealtimeBindings.transit_realtime.ITripUpdate
  >();
  private tripUpdateByStopId = new Map<
    string,
    GtfsRealtimeBindings.transit_realtime.ITripUpdate[]
  >();

  constructor(protected feed: FeedInfo) {
    super(feed);

    setInterval(() => {
      // this.getTripUpdatesFeedData();
      this.getVehiclePositionsFeedData();
      console.log(this.feed.agencyId + ' refresh ...');
    }, feed.refreshRateInSeconds * ONE_SEC_IN_MS);
  }

  async getVehiclePositions(): Promise<
    GtfsRealtimeBindings.transit_realtime.IVehiclePosition[]
  > {
    const vehicleIds = [...this.uniqueVehicleIds];
    return Promise.all(
      vehicleIds.map(async (vehicleId) => {
        return this.getVehiclePositionById(vehicleId);
      }),
    );
  }

  async getVehiclePositionById(
    vehicleId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition> {
    return this.vehiclePositionById.get(vehicleId);
  }

  async getVehiclePositionsFromRoute(
    routeId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition[]> {
    return (await this.getVehiclePositions()).filter((vehiclePosition) => {
      return vehiclePosition.trip.routeId === routeId;
    });
  }

  async getTripUpdateById(
    tripId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.ITripUpdate> {
    return this.tripUpdateByTripId.get(tripId);
  }

  async getTripUpdateFromStop(
    stopId: string,
  ): Promise<GtfsRealtimeBindings.transit_realtime.ITripUpdate[]> {
    return this.tripUpdateByStopId.get(stopId);
  }

  private async getVehiclePositionsFeedData(): Promise<void> {
    try {
      const feedMessage = await this.getFeedMessage(
        this.feed.vehiclePositionUrl,
        this.feed.headers,
      );

      feedMessage.entity.forEach((entity) => {
        if (!entity.vehicle) return;
        this.uniqueVehicleIds.add(entity.vehicle.vehicle.id);
        this.vehiclePositionById.set(entity.vehicle.vehicle.id, entity.vehicle);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  private async getTripUpdatesFeedData(): Promise<void> {
    try {
      const feedMessage = await this.getFeedMessage(
        this.feed.tripUpdateUrl,
        this.feed.headers,
      );

      this.tripUpdateByTripId = new Map();
      this.tripUpdateByStopId = new Map();

      feedMessage.entity.forEach((entity) => {
        if (!entity.tripUpdate?.trip?.tripId) return;
        if (!entity.tripUpdate?.stopTimeUpdate?.length) return;

        this.tripUpdateByTripId.set(
          entity.tripUpdate.trip.tripId,
          entity.tripUpdate,
        );

        entity.tripUpdate.stopTimeUpdate.forEach((stopTimeUpdate) => {
          const tripUdates = this.tripUpdateByStopId.get(stopTimeUpdate.stopId);
          this.tripUpdateByStopId.set(
            stopTimeUpdate.stopId,
            tripUdates
              ? tripUdates.concat([entity.tripUpdate])
              : [entity.tripUpdate],
          );
        });
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  private async getFeedMessage(
    url: string,
    headers: HeadersInit,
  ): Promise<GtfsRealtimeBindings.transit_realtime.FeedMessage> {
    const response = await fetch(url, { headers });
    if (!response.ok)
      throw new Error(`${url}: ${response.status} ${response.statusText}`);

    return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(await response.arrayBuffer()),
    );
  }
}
