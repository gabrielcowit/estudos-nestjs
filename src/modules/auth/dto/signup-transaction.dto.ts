import { Type } from 'class-transformer';
import {
	IsArray,
	IsNotEmpty,
	IsString,
	MinLength,
	IsOptional,
	ArrayMinSize,
	ValidateNested,
} from 'class-validator';

import { CreateVehicleDTO } from '../../vehicle/dto';
export class SignUpTransactionDTO {
	@IsString()
	@MinLength(4)
	@IsNotEmpty()
	username: string;

	@IsString()
	@MinLength(6)
	@IsNotEmpty()
	password: string;

	@IsOptional()
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => CreateVehicleDTO)
	@ValidateNested({
		each: true,
	})
	cars: Array<CreateVehicleDTO>;
}
