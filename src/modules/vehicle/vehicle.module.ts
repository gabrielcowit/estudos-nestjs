import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleWriterService } from './services/vehicle.writer.service';
import { VehicleReaderService } from './services/vehicle.reader.service';
import { VehicleDeleteService } from './services/vehicle.delete.service';
import { VehicleRepository } from './repositories/vehicle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from './services/vehicle.service';

@Module({
	imports: [TypeOrmModule.forFeature([VehicleRepository])],
	providers: [
		VehicleService,
		VehicleWriterService,
		VehicleReaderService,
		VehicleDeleteService,
	],
	controllers: [VehicleController],
})
export class VehicleModule {}