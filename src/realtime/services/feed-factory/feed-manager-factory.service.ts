import { Injectable } from '@nestjs/common';
import { FeedManager } from 'src/realtime/classes/feed-manager';
import { GtfsManager } from 'src/realtime/classes/gtfs-manager';
import { NextBusManager } from 'src/realtime/classes/nextbus-manager';
import { FeedType } from 'src/realtime/feed/feed-info';
import { INSTANCES } from 'src/realtime/feed/feed-instances';

@Injectable()
export class FeedManagerFactoryService {
  private feedManagerByAgencyId = new Map<string, FeedManager>();

  constructor() {
    INSTANCES.forEach((instance) => {
      switch (instance.feedType) {
        case FeedType.GTFSRT:
          this.feedManagerByAgencyId.set(
            instance.agencyId,
            new GtfsManager(instance),
          );
          break;
        case FeedType.NEXTBUSXML:
          this.feedManagerByAgencyId.set(
            instance.agencyId,
            new NextBusManager(instance),
          );
          break;
      }
    });
  }

  getFeedManagerByAgencyId(agencyId: string): FeedManager {
    return this.feedManagerByAgencyId.get(agencyId);
  }
}
