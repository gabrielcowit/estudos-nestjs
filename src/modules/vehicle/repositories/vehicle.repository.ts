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
		const { description, title, year, model } = updateVehicleDTO;
		vehicle.description = description;
		vehicle.title = title;
		vehicle.year = year;
		vehicle.model = model;
		await this.save(vehicle);

		return vehicle;
	}
}
