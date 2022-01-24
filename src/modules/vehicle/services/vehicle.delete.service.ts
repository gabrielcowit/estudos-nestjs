import { Injectable } from '@nestjs/common';
import { SecureService } from '@/core/SecureService';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entity/vehicle.entity';
import { ExceptionDeleteVehicle } from '@/src/trace/errors/vehicle';
@Injectable()
export class VehicleDeleteService extends SecureService {
	constructor(
		@InjectRepository(VehicleRepository)
		private repository: VehicleRepository,
	) {
		super();
	}

	async deleteVehicle(id: string): Promise<Vehicle> {
		return this.run(async () => {
			return this.repository.deleteVehicle(id);
		}, ExceptionDeleteVehicle);
	}
}
