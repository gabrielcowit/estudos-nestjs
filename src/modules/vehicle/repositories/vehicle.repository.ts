import { EntityRepository, Repository } from 'typeorm';
import { Vehicle } from '../entity/vehicle.entity';
import { CreateVehicleDTO, UpdateVehicleDTO } from '../dto';

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {
	async getAllVehicles(): Promise<Vehicle[]> {
		return this.find();
	}
	async getOneVehicle(id): Promise<Vehicle> {
		return this.findOne(id);
	}
	async deleteVehicle(id): Promise<any> {
		return this.delete(id);
	}
	async createVehicle(createVehicleDTO: CreateVehicleDTO): Promise<Vehicle> {
		const { title, description, model, year } = createVehicleDTO;
		const vehicle = this.create({
			title,
			description,
			model,
			year,
		});
		return this.save(vehicle);
	}
	async updateVehicle(
		vehicle: Vehicle,
		updateVehicleDTO: UpdateVehicleDTO,
	): Promise<Vehicle> {
		vehicle.description = updateVehicleDTO.description;
		vehicle.title = updateVehicleDTO.title;
		vehicle.year = updateVehicleDTO.year;
		vehicle.model = updateVehicleDTO.model;
		await this.save(vehicle);

		return vehicle;
	}
}
