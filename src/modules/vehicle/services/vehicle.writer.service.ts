import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { SecureService } from '@/core/SecureService';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { CreateVehicleDTO, UpdateVehicleDTO } from '../dto/';
import { ExceptionUntreatedVehicleCreator } from '@/src/trace/errors/vehicle';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleReaderService } from '.';

@Injectable()
export class VehicleWriterService extends SecureService {
	constructor(
		@Inject(forwardRef(() => VehicleReaderService))
		private vehicleReaderService: VehicleReaderService,
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

	async updateVehicle(id: string, updateVehicleDTO: UpdateVehicleDTO) {
		return this.run(async () => {
			const vehicle = await this.vehicleReaderService.findOrFailById(id);
			return this.vehicleRepository.updateVehicle(
				vehicle,
				updateVehicleDTO,
			);
		});
	}
}
