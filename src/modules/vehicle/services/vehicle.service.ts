import { Injectable } from '@nestjs/common';
import { SecureService } from '@/core/SecureService';
import { Vehicle } from '../entity/vehicle.entity';
import { CreateVehicleDTO, UpdateVehicleDTO } from '../dto';
import {
	ExceptionUntreatedVehicleCreator,
	ExceptionUntreatedVehicleReader,
	ExceptionVehicleNotFound,
	ExceptionDeleteVehicle,
	ExceptionUpdateVehicle,
} from '@/src/trace/errors/vehicle';
import {
	VehicleWriterService,
	VehicleReaderService,
	VehicleDeleteService,
} from './';

@Injectable()
export class VehicleService extends SecureService {
	constructor(
		private writerService: VehicleWriterService,
		private readerService: VehicleReaderService,
		private deleteService: VehicleDeleteService,
	) {
		super();
	}

	async list(): Promise<Vehicle[]> {
		return this.run(async () => {
			return this.readerService.findAll();
		}, ExceptionUntreatedVehicleReader);
	}

	async findById(id: string): Promise<Vehicle> {
		const vehicle = await this.readerService.findById(id);
		if (!vehicle) {
			throw ExceptionVehicleNotFound();
		}
		return vehicle;
	}

	async create(parameters: CreateVehicleDTO) {
		return this.run(async () => {
			return this.writerService.createVehicle(parameters);
		}, ExceptionUntreatedVehicleCreator);
	}

	async update(id, parameters: UpdateVehicleDTO) {
		return this.run(async () => {
			const vehicle = await this.readerService.findById(id);
			return this.writerService.updateVehicle(vehicle, parameters);
		}, ExceptionUpdateVehicle);
	}

	async delete(id: string): Promise<Vehicle> {
		return this.run(async () => {
			return this.deleteService.deleteVehicle(id);
		}, ExceptionDeleteVehicle);
	}
}
