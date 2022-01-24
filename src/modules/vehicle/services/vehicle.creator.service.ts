import { Injectable } from '@nestjs/common';
import { SecureService } from '@/core/SecureService';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { CreateVehicleDTO } from '../dto/create-vehicle.dto';
import { ExceptionUntreatedVehicleCreator } from '@/src/trace/errors/vehicle';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VehicleCreatorService extends SecureService {
	constructor(
		@InjectRepository(VehicleRepository)
		private vehicleRepository: VehicleRepository,
	) {
		super();
	}

	async exec(createVehicleDTO: CreateVehicleDTO) {
		return this.run(async () => {
			return this.vehicleRepository.createVehicle(createVehicleDTO);
		}, ExceptionUntreatedVehicleCreator);
	}
}
