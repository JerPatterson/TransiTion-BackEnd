import dotenv from 'dotenv';
import { FeedInfo, FeedType } from 'src/realtime/feed/feed-info';

dotenv.config();

export const INSTANCES: FeedInfo[] = [
  {
    agencyId: 'stm',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.STM_TRIPS_URL,
    vehiclePositionUrl: process.env.STM_VEHICLES_URL,
    headers: { apiKey: process.env.STM_API_KEY },
  },
  {
    agencyId: 'trains',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.TRAINS_TRIPS_URL,
    vehiclePositionUrl: process.env.TRAINS_VEHICLES_URL,
  },
];
