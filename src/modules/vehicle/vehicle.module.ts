import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleCreatorService } from './services/vehicle.creator.service';
import { VehicleReaderService } from './services/vehicle.reader.service';
import { VehicleRepository } from './repositories/vehicle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([VehicleRepository])],
	providers: [VehicleCreatorService, VehicleReaderService],
	controllers: [VehicleController],
})
export class VehicleModule {}
