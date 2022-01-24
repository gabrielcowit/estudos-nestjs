import {
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Body,
	Put,
} from '@nestjs/common';
import { Vehicle } from './entity/vehicle.entity';
import { CreateVehicleDTO, UpdateVehicleDTO } from './dto/';
import { VehicleService } from './services/vehicle.service';

@Controller('vehicles')
export class VehicleController {
	constructor(private vehicleService: VehicleService) {}

	@Get()
	findAll(): Promise<Vehicle[]> {
		return this.vehicleService.list();
	}

	@Get('/:id')
	findVehicle(@Param() id: string): Promise<Vehicle> {
		return this.vehicleService.findById(id);
	}

	@Post()
	createVehicle(@Body() createVehicleDTO: CreateVehicleDTO) {
		return this.vehicleService.create(createVehicleDTO);
	}

	@Delete('/:id')
	deleteVehicle(@Param() id: string): Promise<Vehicle> {
		return this.vehicleService.delete(id);
	}

	@Put('/:id')
	updateVehicle(
		@Param() id: string,
		@Body() updateVehicleDTO: UpdateVehicleDTO,
	): Promise<Vehicle> {
		return this.vehicleService.update(id, updateVehicleDTO);
	}
}
