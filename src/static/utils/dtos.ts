import { LocationType, WheelchairBoardingType } from './enums';

export class AgencyDto {
  agency_id: string;
  agency_name: string;
  agency_url: string;
  agency_timezone: string;
  agency_lang?: string;
  agency_phone?: string;
  agency_fare_url?: string;
  agency_email?: string;
}

export class StopDto {
  stop_id: string;
  stop_code?: string;
  stop_name: string;
  stop_desc?: string;
  stop_lat: number;
  stop_lon: number;
  zone_id?: string;
  stop_url?: string;
  location_type: LocationType;
  parent_station?: string;
  stop_timezone?: string;
  wheelchair_boarding?: WheelchairBoardingType;
  level_id?: string;
  platform_code?: string;
}

export class RouteDto {
  route_id: string;
  agency_id: string;
  route_short_name: string;
  route_long_name: string;
  route_desc?: string;
  route_type: number;
  route_url?: string;
  route_color?: string;
  route_text_color?: string;
  route_sort_order?: number;
  continuous_pickup?: string;
  continuous_drop_off?: string;
  wheelchair_boarding?: number;
}
