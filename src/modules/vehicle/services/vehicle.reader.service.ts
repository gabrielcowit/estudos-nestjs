import { Injectable } from '@nestjs/common';
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

	async findById(id: string): Promise<Vehicle> {
		const vehicle = await this.repository.getOne(id);
		if (!vehicle) {
			throw ExceptionVehicleNotFound();
		}
		return vehicle;
	}
}
