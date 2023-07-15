import { FeedManager } from 'src/realtime/classes/feed-manager';
import { FeedInfo } from 'src/realtime/feed/feed-info';
import {
  MINUTES_OF_TRIP_CHANGE,
  ONE_HOUR_IN_SEC,
  ONE_KM_IN_METER,
  ONE_SEC_IN_MS,
} from 'src/static/utils/constants';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export class NextBusManager extends FeedManager {
  private uniqueVehicleIds = new Set<string>();
  private vehiclePositionById = new Map<
    string,
    GtfsRealtimeBindings.transit_realtime.IVehiclePosition
  >();

  private tripDescriptorByVehicleId = new Map<
    string,
    GtfsRealtimeBindings.transit_realtime.ITripDescriptor
  >();
  private tripUpdateByTripId = new Map<
    string,
    GtfsRealtimeBindings.transit_realtime.ITripUpdate
  >();

  constructor(protected feed: FeedInfo) {
    super(feed);

    setInterval(async () => {
      await this.getVehicleTripData();
      await this.getVehiclePositionsFeedData();
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
      return vehiclePosition.trip?.routeId === routeId;
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
    try {
      const xmlDocument = await this.getXmlMessage(
        `${this.feed.tripUpdateUrl}&stopId=${stopId}`,
        this.feed.headers,
      );

      const tripUpdates = [];

      xmlDocument
        .querySelectorAll('predictions')
        .forEach(async (predictions) => {
          const routeTag = predictions.getAttribute('routeTag');
          predictions
            .querySelectorAll('prediction')
            .forEach(async (prediction) => {
              const vehicleId = prediction.getAttribute('vehicle');
              const tripTag = prediction.getAttribute('tripTag');
              const epochTime = Number(prediction.getAttribute('epochTime'));
              tripUpdates.push({
                ...this.tripUpdateByTripId.get(tripTag),
                trip: {
                  tripId: tripTag,
                  routeId: routeTag,
                },
                vehicle: {
                  id: vehicleId,
                },
                stopTimeUpdate: [
                  {
                    stopId: stopId,
                    arrival: {
                      delay: undefined, // TODO
                      time: epochTime,
                    },
                  },
                ],
              });
            });
        });
      return tripUpdates;
    } catch (e) {
      console.log(e.message);
    }
  }

  private async getVehiclePositionsFeedData(): Promise<void> {
    try {
      const xmlDocument = await this.getXmlMessage(
        `${this.feed.vehiclePositionUrl}&t=${
          Date.now() - this.feed.refreshRateInSeconds * ONE_SEC_IN_MS
        }`,
        this.feed.headers,
      );

      xmlDocument.querySelectorAll('vehicle').forEach(async (vehicle) => {
        const vehiclePosition = await this.convertVehicleElement(vehicle);
        if (!vehiclePosition.vehicle) return;
        this.uniqueVehicleIds.add(vehiclePosition.vehicle.id);
        this.vehiclePositionById.set(
          vehiclePosition.vehicle.id,
          vehiclePosition,
        );
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  private async convertVehicleElement(
    vehicle: Element,
  ): Promise<GtfsRealtimeBindings.transit_realtime.IVehiclePosition> {
    const id = vehicle.getAttribute('id');
    const lat = Number(vehicle.getAttribute('lat'));
    const lon = Number(vehicle.getAttribute('lon'));
    const routeTag = vehicle.getAttribute('routeTag');
    const secsSinceReport = Number(vehicle.getAttribute('secsSinceReport'));
    const heading = Number(vehicle.getAttribute('heading'));
    const speedKmHr = Number(vehicle.getAttribute('speedKmHr'));
    const trip = this.tripDescriptorByVehicleId.get(id);

    return {
      trip: trip?.routeId !== routeTag ? { routeId: routeTag } : trip,
      vehicle: { id },
      position: {
        latitude: lat,
        longitude: lon,
        bearing: heading < 0 ? undefined : heading,
        speed: (speedKmHr * ONE_KM_IN_METER) / ONE_HOUR_IN_SEC,
      },
      timestamp: Date.now() / ONE_SEC_IN_MS - secsSinceReport,
    };
  }

  private async getVehicleTripData(): Promise<void> {
    const stlUrl = // TODO
      'https://retro.umoiq.com/service/publicXMLFeed?command=predictionsForMultiStops&a=stl&stops=12E|CP47012&stops=12O|CP45054&stops=144E|CP46238&stops=144O|CP40144' +
      '&stops=151N|CP40151&stops=151S|CP41546&stops=16E|CP46685&stops=16O|CP48016&stops=17N|CP47017&stops=17S|CP41068&stops=20E|CP46383&stops=20O|CP47020&stops=222E|C' +
      'P47222&stops=222O|CP45067&stops=22E|CP47022&stops=22O|CP42379&stops=24E|CP43428&stops=24O|CP47024&stops=252E|CP46654&stops=252O|CP41272&stops=26E|CP41196&stops' +
      '=26O|CP48026&stops=27N|CP47027&stops=27S|CP46022&stops=2E|CP48002&stops=2O|CP40002&stops=313N|CP40151&stops=313S|CP46646&stops=31N|CP46654&stops=31S|CP46541&st' +
      'ops=33N|CP47033&stops=33S|CP48033&stops=360N|CP48360&stops=36E|CP46563&stops=36O|CP48036&stops=37N|CP47037&stops=37S|CP46421&stops=39N|CP44139&stops=39S|CP4106' +
      '8&stops=40E|CP45001&stops=40O|CP48040&stops=41N|CP47041&stops=41S|CP43181&stops=42E|CP44042&stops=42O|CP41272&stops=43N|CP47043&stops=43S|CP41009&stops=45N|CP4' +
      '8045&stops=45S|CP41068&stops=46N|CP48046&stops=46S|CP43086&stops=48E|CP47048&stops=48O|CP46712&stops=50E|CP44050&stops=50O|CP46634&stops=52E|CP46654&stops=52O|' +
      'CP42379&stops=55N|CP46654&stops=55S|CP43086&stops=56E|CP46238&stops=56O|CP48056&stops=58E|CP47058&stops=58O|CP46634&stops=60E|CP41022&stops=60O|CP47060&stops=6' +
      '1N|CP48061&stops=61S|CP43267&stops=63N|CP47063&stops=63S|CP46330&stops=65N|CP48065&stops=65S|CP46331&stops=66E|CP46238&stops=66O|CP44066&stops=70E|CP48070&stop' +
      's=70O|CP47070&stops=713N|CP40802&stops=713S|CP46662&stops=730N|CP46659&stops=730S|CP45003&stops=73N|CP47073&stops=73S|CP46525&stops=744E|CP45003&stops=744O|CP4' +
      '0802&stops=74E|CP47074&stops=74O|CP42379&stops=76E|CP41198&stops=76O|CP48076&stops=901N|CP47901&stops=901S|CP45060&stops=902N|CP40144&stops=902S|CP44902&stops=' +
      '903N|CP48903&stops=903S|CP41198&stops=925N|CP40925&stops=925S|CP41272&stops=942E|CP48942&stops=942O|CP41272';
    try {
      const xmlDocument = await this.getXmlMessage(stlUrl, this.feed.headers);
      xmlDocument
        .querySelectorAll('predictions')
        .forEach(async (predictions) => {
          const routeTag = predictions.getAttribute('routeTag');
          predictions
            .querySelectorAll('prediction')
            .forEach(async (prediction) => {
              const vehicleId = prediction.getAttribute('vehicle');
              const minutes = Number(prediction.getAttribute('minutes'));
              if (vehicleId.includes('virtualVehicle')) return;
              const tripDescriptor = await this.convertTripDescriptor(
                routeTag,
                prediction,
              );
              if (minutes < MINUTES_OF_TRIP_CHANGE)
                this.tripDescriptorByVehicleId.set(vehicleId, tripDescriptor);
              this.tripUpdateByTripId.set(tripDescriptor.tripId, {
                trip: tripDescriptor,
                vehicle: { id: vehicleId },
                stopTimeUpdate: [], // TODO
                timestamp: Date.now(), // TODO
                delay: undefined, // TODO
              });
            });
        });
    } catch (e) {
      console.log(e);
    }
  }

  private async convertTripDescriptor(
    routeTag: string,
    prediction: Element,
  ): Promise<GtfsRealtimeBindings.transit_realtime.ITripDescriptor> {
    const epochTime = new Date(Number(prediction.getAttribute('epochTime')));
    const tripTag = prediction.getAttribute('tripTag');
    const dirTag = prediction.getAttribute('dirTag').split('_');

    return {
      tripId: tripTag,
      routeId: routeTag,
      directionId: dirTag.length > 1 ? Number(dirTag[1]) : null,
      startTime: `${this.convertToTwoDigits(
        epochTime.getHours(),
      )}:${this.convertToTwoDigits(
        epochTime.getMinutes(),
      )}:${this.convertToTwoDigits(epochTime.getSeconds())}`,
      startDate: `${epochTime.getFullYear()}${this.convertToTwoDigits(
        epochTime.getMonth(),
      )}${this.convertToTwoDigits(epochTime.getDay())}`,
    };
  }

  private async getXmlMessage(
    url: string,
    headers: HeadersInit,
  ): Promise<Document> {
    const contentType = 'text/xml';
    const response = await fetch(url, { headers });
    if (!response.ok)
      throw new Error(`${url}: ${response.status} ${response.statusText}`);

    return new JSDOM(await response.text(), { contentType }).window.document;
  }

  private convertToTwoDigits(nb: number): string {
    return nb < 10 ? '0' + nb.toString() : nb.toString();
  }
}
