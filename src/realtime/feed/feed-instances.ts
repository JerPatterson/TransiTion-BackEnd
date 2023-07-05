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
  {
    agencyId: 'citla',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITLA_TRIPS_URL,
    vehiclePositionUrl: process.env.CITLA_VEHICLES_URL,
  },
  {
    agencyId: 'mrclasso',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.MRCLASSO_TRIPS_URL,
    vehiclePositionUrl: process.env.MRCLASSO_VEHICLES_URL,
  },
  {
    agencyId: 'mrclm',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.MRCLM_TRIPS_URL,
    vehiclePositionUrl: process.env.MRCLM_VEHICLES_URL,
  },
  {
    agencyId: 'citvr',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITVR_TRIPS_URL,
    vehiclePositionUrl: process.env.CITVR_VEHICLES_URL,
  },
  {
    agencyId: 'citrous',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITROUS_TRIPS_URL,
    vehiclePositionUrl: process.env.CITROUS_VEHICLES_URL,
  },
  {
    agencyId: 'citlr',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITLR_TRIPS_URL,
    vehiclePositionUrl: process.env.CITLR_VEHICLES_URL,
  },
  // ACTIF APRÈS REM
  // {
  //   agencyId: 'lrrs',
  //   refreshRateInSeconds: 30,
  //   feedType: FeedType.GTFSRT,
  //   tripUpdateUrl: process.env.LRRS_TRIPS_URL,
  //   vehiclePositionUrl: process.env.LRRS_VEHICLES_URL,
  // },
  {
    agencyId: 'citpi',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITPI_TRIPS_URL,
    vehiclePositionUrl: process.env.CITPI_VEHICLES_URL,
  },
  {
    agencyId: 'citso',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITSO_TRIPS_URL,
    vehiclePositionUrl: process.env.CITSO_VEHICLES_URL,
  },
  {
    agencyId: 'citsv',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITSV_TRIPS_URL,
    vehiclePositionUrl: process.env.CITSV_VEHICLES_URL,
  },
  {
    agencyId: 'omitsju',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.OMITSJU_TRIPS_URL,
    vehiclePositionUrl: process.env.OMITSJU_VEHICLES_URL,
  },
  {
    agencyId: 'citcrc',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITCRC_TRIPS_URL,
    vehiclePositionUrl: process.env.CITCRC_VEHICLES_URL,
  },
  {
    agencyId: 'cithsl',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.CITHSL_TRIPS_URL,
    vehiclePositionUrl: process.env.CITHSL_VEHICLES_URL,
  },
  {
    agencyId: 'rtl',
    refreshRateInSeconds: 30,
    feedType: FeedType.GTFSRT,
    tripUpdateUrl: process.env.RTL_TRIPS_URL,
    vehiclePositionUrl: process.env.RTL_VEHICLES_URL,
  },
  {
    agencyId: 'stl',
    refreshRateInSeconds: 30,
    feedType: FeedType.NEXTBUSXML,
    tripUpdateUrl: process.env.STL_TRIPS_URL,
    vehiclePositionUrl: process.env.STL_VEHICLES_URL,
  },
];
