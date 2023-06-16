import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticModule } from './static/static.module';
import { Agency } from './entities/Agency';
import { Stop } from './entities/Stop';
import { Trip } from './entities/Trip';
import { Time } from './entities/Time';
import { Route } from './entities/Route';
import { Shape } from './entities/Shape';
import { CalendarDate } from './entities/CalendarDate';
import { Calendar } from './entities/Calendar';
import { TripUpdateController } from './realtime/controllers/trip-update/trip-update.controller';
import { TripUpdateService } from './realtime/services/trip-update/trip-update.service';
import { VehiclePositionService } from './realtime/services/vehicle-position/vehicle-position.service';
import { VehiclePositionController } from './realtime/controllers/vehicle-position/vehicle-position.controller';
import { RealtimeModule } from './realtime/realtime.module';

import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        Agency,
        Stop,
        Route,
        Time,
        Trip,
        Shape,
        Calendar,
        CalendarDate,
      ],
      synchronize: true,
    }),
    StaticModule,
    RealtimeModule,
  ],
  controllers: [AppController, TripUpdateController, VehiclePositionController],
  providers: [AppService, TripUpdateService, VehiclePositionService],
})
export class AppModule {}
