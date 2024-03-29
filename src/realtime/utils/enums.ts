export enum ScheduleRelationship {
  SCHEDULED,
  ADDED,
  UNSCHEDULED,
  CANCELED,
}

export enum VehicleStopStatus {
  INCOMIND_AT,
  STOPPED_AT,
  IN_TRANSIT_TO,
}

export enum CongestionLevel {
  UNKNOWN_CONGESTION_LEVEL,
  RUNNING_SMOOTHLY,
  STOP_AND_GO,
  CONGESTION,
  SEVERE_CONGESTION,
}

export enum OccupancyStatus {
  EMPTY,
  MANY_SEATS_AVAILABLE,
  FEW_SEATS_AVAILABLE,
  STANDING_ROOM_ONLY,
  CRUSHED_STANDING_ROOM_ONLY,
  FULL,
  NOT_ACCEPTING_PASSENGERS,
  NO_DATA_AVAILABLE,
  NOT_BOARDABLE,
}

export enum Incrementality {
  FULL_DATASET,
  DIFFERENTIAL,
}
