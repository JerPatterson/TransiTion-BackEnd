import { LocationType, WheelchairBoardingType } from './enums';

export class AgencyDto {
  agency_id: string;
  name: string;
  url: string;
  timezone: string;
  lang?: string;
  phone?: string;
  fare_url?: string;
  email?: string;
}

export class StopDto {
  stop_id: string;
  code?: string;
  name: string;
  desc?: string;
  lat: number;
  lon: number;
  zone_id?: string;
  stop_url?: string;
  location_type: LocationType;
  parent_station?: string;
  timezone?: string;
  wheelchair_boarding?: WheelchairBoardingType;
  level_id?: string;
  platform_code?: string;
}
