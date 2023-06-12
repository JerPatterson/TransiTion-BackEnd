import { Module } from '@nestjs/common';
import { AgencyController } from './controllers/agency/agency.controller';
import { AgencyService } from './services/agency/agency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from 'src/entities/Agency';
import { StopService } from './services/stop/stop.service';
import { StopsController } from './controllers/stop/stop.controller';
import { Stop } from 'src/entities/Stop';
import { RouteService } from './services/route/route.service';
import { RouteController } from './controllers/route/route.controller';
import { Route } from 'src/entities/Route';
import { Time } from 'src/entities/Time';
import { Trip } from 'src/entities/Trip';
import { TripController } from './controllers/trip/trip.controller';
import { TripService } from './services/trip/trip.service';
import { TimeController } from './controllers/time/time.controller';
import { TimeService } from './services/time/time.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agency, Stop, Route, Trip, Time])],
  controllers: [
    AgencyController,
    StopsController,
    RouteController,
    TripController,
    TimeController,
  ],
  providers: [
    AgencyService,
    StopService,
    RouteService,
    TripService,
    TimeService,
  ],
})
export class StaticModule {}
