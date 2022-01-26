import { EntityRepository, Repository } from 'typeorm';
import { Vehicle } from '../entity/vehicle.entity';
import { CreateVehicleDTO, UpdateVehicleDTO } from '../dto';
import { User } from '../../user/entity/user.entity';
import { getUser } from '../../auth/get-user.decorator';

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {
	async getAllVehicles(user): Promise<Vehicle[]> {
		return this.find({ user });
	}
	async getOneVehicle(user: User, id: string): Promise<Vehicle> {
		return this.findOne({ where: { id, user } });
		//return this.findOne({ id, user }); it will works too
	}
	async deleteVehicle(id: string, user: User): Promise<any> {
		return this.delete({ id, user });
	}
	async createVehicle(
		user: User,
		createVehicleDTO: CreateVehicleDTO,
	): Promise<Vehicle> {
		const { title, description, model, year } = createVehicleDTO;
		const vehicle = this.create({
			title,
			description,
			model,
			year,
			user,
		});
		return this.save(vehicle);
	}
	async updateVehicle(
		vehicle: Vehicle,
		user: User,
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
