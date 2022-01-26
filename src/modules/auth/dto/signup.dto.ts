import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
	@IsString()
	@MinLength(4)
	@IsNotEmpty()
	username: string;

	@IsString()
	@MinLength(6)
	@IsNotEmpty()
	password: string;
}
