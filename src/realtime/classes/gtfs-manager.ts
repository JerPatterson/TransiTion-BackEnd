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

  constructor(protected feed: FeedInfo) {
    super(feed);

    setInterval(
      () => this.getVehiclePositionsFeedData(),
      feed.refreshRateInSeconds * ONE_SEC_IN_MS,
    );
  }

  async getVehiclePositions(): Promise<
    GtfsRealtimeBindings.transit_realtime.IVehiclePosition[]
  > {
    const vehicleIds = [...this.uniqueVehicleIds];
    return Promise.all(
      vehicleIds.map(async (vehicleId) => {
        return await this.getVehiclePositionById(vehicleId);
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

  private async getVehiclePositionsFeedData(): Promise<void> {
    try {
      console.log(this.feed.agencyId + ' refresh ...');
      const response = await fetch(this.feed.vehiclePositionUrl, {
        headers: this.feed.headers,
      });

      if (!response.ok) {
        throw new Error(
          `${response.url}: ${response.status} ${response.statusText}`,
        );
      }

      const buffer = await response.arrayBuffer();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer),
      );

      feed.entity.forEach((entity) => {
        if (!entity.vehicle) return;
        this.uniqueVehicleIds.add(entity.vehicle.vehicle.id);
        this.vehiclePositionById.set(entity.vehicle.vehicle.id, entity.vehicle);
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
