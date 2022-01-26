import {
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Body,
	Put,
	UseGuards,
} from '@nestjs/common';
import { Vehicle } from './entity/vehicle.entity';
import { CreateVehicleDTO, UpdateVehicleDTO } from './dto/';
import { AuthGuard } from '@nestjs/passport';
import {
	VehicleDeleteService,
	VehicleReaderService,
	VehicleWriterService,
} from './services';

@Controller('vehicles')
@UseGuards(AuthGuard())
export class VehicleController {
	constructor(
		private vehicleWriterService: VehicleWriterService,
		private vehicleReaderService: VehicleReaderService,
		private vehicleDeleteService: VehicleDeleteService,
	) {}

	@Get()
	findAll(): Promise<Vehicle[]> {
		return this.vehicleReaderService.findAll();
	}

	@Get('/:id')
	findVehicle(@Param() id: string): Promise<Vehicle> {
		return this.vehicleReaderService.findOrFailById(id);
	}

	@Post()
	@UseGuards(AuthGuard())
	createVehicle(@Body() createVehicleDTO: CreateVehicleDTO) {
		return this.vehicleWriterService.createVehicle(createVehicleDTO);
	}

	@Delete('/:id')
	deleteVehicle(@Param() id: string): Promise<Vehicle> {
		return this.vehicleDeleteService.deleteVehicle(id);
	}

	@Put('/:id')
	updateVehicle(
		@Param() id: string,
		@Body() updateVehicleDTO: UpdateVehicleDTO,
	): Promise<Vehicle> {
		return this.vehicleWriterService.updateVehicle(id, updateVehicleDTO);
	}
}
