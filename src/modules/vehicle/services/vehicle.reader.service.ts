import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SecureService } from '@/core/SecureService';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entity/vehicle.entity';
import {
	ExceptionUntreatedVehicleReader,
	ExceptionVehicleNotFound,
} from '@/src/trace/errors/vehicle';
@Injectable()
export class VehicleReaderService extends SecureService {
	constructor(
		@InjectRepository(VehicleRepository)
		private repository: VehicleRepository,
	) {
		super();
	}

	async findOrFailById(id: string): Promise<Vehicle> {
		const vehicle = await this.repository.getOneVehicle(id);
		if (!vehicle) {
			throw ExceptionVehicleNotFound();
		}
		return vehicle;
	}

	async findAll(): Promise<Vehicle[]> {
		return this.run(async () => {
			return this.repository.getAllVehicles();
		}, ExceptionUntreatedVehicleReader);
	}
}
