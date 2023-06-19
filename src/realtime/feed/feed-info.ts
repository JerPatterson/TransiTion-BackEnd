export class FeedInfo {
  agencyId: string;
  licenseUrl?: string;
  refreshRateInSeconds: number;

  vehiclePositionUrl: string;
  tripUpdateUrl: string;
  headers?: HeadersInit;
}
