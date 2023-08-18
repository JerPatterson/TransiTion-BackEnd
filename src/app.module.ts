import dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticModule } from './static/static.module';
import { Agency } from './entities/Agency';
import { Stop } from './entities/Stop';
import { Trip } from './entities/Trip';
import { Time } from './entities/Time';
import { Route } from './entities/Route';
import { CalendarDate } from './entities/CalendarDate';
import { Calendar } from './entities/Calendar';
import { RealtimeModule } from './realtime/realtime.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.PLANETSCALE_URL,
      host: process.env.PLANETSCALE_HOST,
      username: process.env.PLANETSCALE_USERNAME,
      password: process.env.PLANETSCALE_PASSWORD,
      database: process.env.PLANETSCALE_DATABASE,
      ssl: {},
      entities: [Agency, Stop, Route, Time, Trip, Calendar, CalendarDate],
    }),
    StaticModule,
    RealtimeModule,
  ],
})
export class AppModule {}
