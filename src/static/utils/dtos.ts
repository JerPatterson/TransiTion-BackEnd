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
  agency_id: string;
  stop_id: string;
  stop_code?: string;
  stop_name: string;
  stop_desc?: string;
  stop_lat: number;
  stop_lon: number;
  zone_id?: string;
  stop_url?: string;
  location_type: number;
  parent_station?: string;
  stop_timezone?: string;
  level_id?: string;
  platform_code?: string;
  stop_shelter?: number;
  wheelchair_boarding?: number;
  route_ids?: string[];
}

export class RouteDto {
  agency_id: string;
  route_id: string;
  route_short_name: string;
  route_long_name: string;
  route_desc?: string;
  route_type: number;
  route_url?: string;
  route_color?: string;
  route_text_color?: string;
  route_sort_order?: number;
  continuous_pickup?: number;
  continuous_drop_off?: number;
  wheelchair_boarding?: number;
  night_only?: number;
  stop_ids?: string[];
}

export class TripDto {
  agency_id: string;
  route_id: string;
  service_id: string;
  trip_id: string;
  trip_headsign: string;
  trip_short_name?: string;
  direction_id?: number;
  block_id?: string;
  shape_id: string;
  wheelchair_accessible?: number;
  bikes_allowed?: number;
}

export class TimeDto {
  agency_id: string;
  trip_id: string;
  arrival_time: string;
  departure_time: string;
  stop_id: string;
  stop_sequence: number;
  stop_headsign?: string;
  pickup_type?: number;
  drop_off_type?: number;
  continuous_pickup?: number;
  continuous_drop_off?: number;
  shape_dist_traveled?: number;
  timepoint?: number;
}

export class ShapesDto {
  agency_id: string;
  shape_id: string;
  shapes: ShapeDto[];
}

export class ShapeDto {
  shape_pt_lat: number;
  shape_pt_lon: number;
  shape_pt_sequence: number;
  shape_dist_traveled?: number;
}

export class CalendarDto {
  agency_id: string;
  service_id: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  start_date: number;
  end_date: number;
}

export class CalendarDateDto {
  agency_id: string;
  service_id: string;
  date: number;
  exception_type: number;
}

export class AreaDto {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
}

export class DateDto {
  year: number;
  month: number;
  day: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
