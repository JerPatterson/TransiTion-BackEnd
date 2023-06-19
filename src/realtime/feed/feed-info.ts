export class FeedInfo {
  agencyId: string;
  feedType: FeedType;
  licenseUrl?: string;
  refreshRateInSeconds: number;
  vehiclePositionUrl: string;
  tripUpdateUrl: string;
  headers?: HeadersInit;
}

export enum FeedType {
  GTFSRT,
  NEXTBUSXML,
}
