import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleWriterService } from './services/vehicle.writer.service';
import { VehicleDeleteService } from './services/vehicle.delete.service';
import { VehicleReaderService } from './services';
import { VehicleRepository } from './repositories/vehicle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([VehicleRepository]), AuthModule],
	providers: [
		VehicleReaderService,
		VehicleWriterService,
		VehicleDeleteService,
	],
	controllers: [VehicleController],
	exports: [VehicleReaderService],
})
export class VehicleModule {}
