import {
  CongestionLevel,
  Incrementality,
  OccupancyStatus,
  ScheduleRelationship,
  VehicleStopStatus,
} from './enums';

export class FeedMessage {
  header: FeedHeader;
  entity: FeedEntity;
}

export class FeedHeader {
  gtfs_realtime_version: string;
  incrementality: Incrementality;
  timestamp: number;
}

export class FeedEntity {
  id: string;
  is_deleted: boolean;
  trip_update: TripUpdate;
  vehicle: VehiclePosition;
}

export class TripUpdate {
  trip: TripDescriptor;
  vehicle: VehicleDescriptor;
  stop_time_update: StopTimeUpdate[];
  timestamp: number;
  delay: number;
}

export class TripDescriptor {
  trip_id: string;
  route_id: string;
  direction_id: string;
  start_time: string;
  start_date: string;
  schedule_relationship?: ScheduleRelationship;
}

export class VehicleDescriptor {
  id: string;
  label?: string;
  license_plate?: string;
}

export class StopTimeUpdate {
  stop_sequence: number;
  stop_id: string;
  arrival: StopTimeEvent;
  departure: StopTimeEvent;
  schedule_relation_ship?: ScheduleRelationship;
}

export class StopTimeEvent {
  delay: number;
  time: number;
  uncertainty: number;
}

export class VehiclePosition {
  trip: TripDescriptor;
  vehicle: VehicleDescriptor;
  position: Position;
  current_stop_sequence?: number;
  stop_id?: string;
  current_status?: VehicleStopStatus;
  timestamp: number;
  congestion_level?: CongestionLevel;
  occupancy_status?: OccupancyStatus;
}

export class Position {
  latitude: number;
  longitude: number;
  bearing?: number;
  odometer?: number;
  speed?: number;
}
