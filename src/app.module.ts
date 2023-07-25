import dotenv from 'dotenv';
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
import { RealtimeModule } from './realtime/realtime.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.PS_URL,
      host: process.env.PS_HOST,
      username: process.env.PS_USERNAME,
      password: process.env.PS_PASSWORD,
      database: process.env.PS_DATABASE,
      ssl: {},
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
    }),
    StaticModule,
    RealtimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
