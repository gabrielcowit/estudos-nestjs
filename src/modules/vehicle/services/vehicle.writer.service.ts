import { Injectable } from '@nestjs/common';
import { SecureService } from '@/core/SecureService';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { CreateVehicleDTO, UpdateVehicleDTO } from '../dto/';
import { ExceptionUntreatedVehicleCreator } from '@/src/trace/errors/vehicle';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entity/vehicle.entity';

@Injectable()
export class VehicleWriterService extends SecureService {
	constructor(
		@InjectRepository(VehicleRepository)
		private vehicleRepository: VehicleRepository,
	) {
		super();
	}

	async createVehicle(createVehicleDTO: CreateVehicleDTO) {
		return this.run(async () => {
			return this.vehicleRepository.createVehicle(createVehicleDTO);
		}, ExceptionUntreatedVehicleCreator);
	}

	async updateVehicle(vehicle: Vehicle, updateVehicleDTO: UpdateVehicleDTO) {
		return this.run(async () => {
			return this.vehicleRepository.updateVehicle(
				vehicle,
				updateVehicleDTO,
			);
		});
	}
}
