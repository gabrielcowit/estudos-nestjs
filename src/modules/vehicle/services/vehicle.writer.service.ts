import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { SecureService } from '@/core/SecureService';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { CreateVehicleDTO, UpdateVehicleDTO } from '../dto/';
import { ExceptionUntreatedVehicleCreator } from '@/src/trace/errors/vehicle';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleReaderService } from '.';
import { User } from '../../user/entity/user.entity';

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

	async createVehicle(user: User, createVehicleDTO: CreateVehicleDTO) {
		return this.run(async () => {
			return this.vehicleRepository.createVehicle(user, createVehicleDTO);
		}, ExceptionUntreatedVehicleCreator);
	}

	async updateVehicle(
		id: string,
		user: User,
		updateVehicleDTO: UpdateVehicleDTO,
	) {
		return this.run(async () => {
			const vehicle = await this.vehicleReaderService.findOrFailById(
				user,
				id,
			);
			return this.vehicleRepository.updateVehicle(
				vehicle,
				user,
				updateVehicleDTO,
			);
		});
	}
}
