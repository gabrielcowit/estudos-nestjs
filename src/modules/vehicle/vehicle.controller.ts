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
import { getUser } from '../auth/get-user.decorator';
import { User } from '../user/entity/user.entity';

@Controller('vehicles')
@UseGuards(AuthGuard())
export class VehicleController {
	constructor(
		private vehicleWriterService: VehicleWriterService,
		private vehicleReaderService: VehicleReaderService,
		private vehicleDeleteService: VehicleDeleteService,
	) {}

	@Get()
	findAll(@getUser() user: User): Promise<Vehicle[]> {
		return this.vehicleReaderService.findAll(user);
	}

	@Get('/:id')
	findVehicle(
		@getUser() user: User,
		@Param('id') id: string,
	): Promise<Vehicle> {
		return this.vehicleReaderService.findOrFailById(user, id);
	}

	@Post()
	createVehicle(
		@Body() createVehicleDTO: CreateVehicleDTO,
		@getUser() user: User,
	) {
		return this.vehicleWriterService.createVehicle(user, createVehicleDTO);
	}

	@Delete('/:id')
	deleteVehicle(
		@getUser() user: User,
		@Param('id') id: string,
	): Promise<Vehicle> {
		return this.vehicleDeleteService.deleteVehicle(id, user);
	}

	@Put('/:id')
	updateVehicle(
		@getUser() user: User,
		@Param('id') id: string,
		@Body() updateVehicleDTO: UpdateVehicleDTO,
	): Promise<Vehicle> {
		return this.vehicleWriterService.updateVehicle(
			id,
			user,
			updateVehicleDTO,
		);
	}
}
