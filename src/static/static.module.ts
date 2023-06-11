import { Module } from '@nestjs/common';
import { AgencyController } from './controllers/agency/agency.controller';
import { AgencyService } from './services/agency/agency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from 'src/entities/Agency';

@Module({
  imports: [TypeOrmModule.forFeature([Agency])],
  controllers: [AgencyController],
  providers: [AgencyService],
})
export class StaticModule {}
