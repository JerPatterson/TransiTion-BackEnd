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
import { ShapeController } from './controllers/shape/shapes.controller';
import { ShapeService } from './services/shape/shape.service';
import { Shape } from 'src/entities/Shape';
import { ServiceService } from './services/service/service.service';
import { ServiceController } from './controllers/service/service.controller';
import { Calendar } from 'src/entities/Calendar';
import { CalendarDate } from 'src/entities/CalendarDate';
import { DatabaseService } from './services/database/database.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agency,
      Stop,
      Route,
      Trip,
      Time,
      Shape,
      Calendar,
      CalendarDate,
    ]),
  ],
  controllers: [
    AgencyController,
    StopsController,
    RouteController,
    TripController,
    TimeController,
    ShapeController,
    ServiceController,
  ],
  providers: [
    AgencyService,
    StopService,
    RouteService,
    TripService,
    TimeService,
    ShapeService,
    ServiceService,
    DatabaseService,
  ],
})
export class StaticModule {}
