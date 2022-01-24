import { EntityRepository, Repository } from 'typeorm';
import { Vehicle } from '../entity/vehicle.entity';
import { CreateVehicleDTO } from '../dto/create-vehicle.dto';

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {
	async getAllVehicles(): Promise<Vehicle[]> {
		return this.find();
	}
	async getOneVehicle(id): Promise<Vehicle> {
		return this.findOne(id);
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
}
