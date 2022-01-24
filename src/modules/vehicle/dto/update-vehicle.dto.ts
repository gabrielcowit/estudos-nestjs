import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class UpdateVehicleDTO {
	id: number;

	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	description: string;

	@IsNotEmpty()
	model: string;

	@IsNotEmpty()
	year: number;
}
