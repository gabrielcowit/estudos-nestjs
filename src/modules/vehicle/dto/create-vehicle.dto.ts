import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateVehicleDTO {
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
