import { Module } from '@nestjs/common';
import { AgencyController } from './controllers/agency/agency.controller';
import { AgencyService } from './services/agency/agency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from 'src/entities/Agency';
import { StopService } from './services/stop/stop.service';
import { StopsController } from './controllers/stop/stop.controller';
import { Stop } from 'src/entities/Stop';

@Module({
  imports: [TypeOrmModule.forFeature([Agency, Stop])],
  controllers: [AgencyController, StopsController],
  providers: [AgencyService, StopService],
})
export class StaticModule {}
