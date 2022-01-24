import {
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Body,
	Query,
} from '@nestjs/common';
import { VehicleCreatorService } from './services/vehicle.creator.service';
import { VehicleReaderService } from './services/vehicle.reader.service';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';

@Controller('vehicles')
export class VehicleController {
	constructor(
		private vehicleCreatorService: VehicleCreatorService,
		private vehicleReaderService: VehicleReaderService,
	) {}

	@Get()
	findAll(): Promise<Vehicle[]> {
		return this.vehicleReaderService.findAll();
	}

	@Get('/:id')
	findVehicle(@Param() id: string): Promise<Vehicle> {
		return this.vehicleReaderService.findById(id);
	}

	@Post()
	createVehicle(@Body() createVehicleDTO: CreateVehicleDTO) {
		return this.vehicleCreatorService.exec(createVehicleDTO);
	}
}
