import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HasherService {
	async generate(value: string) {
		const salt = await this.salt();
		return bcrypt.hash(value, salt);
	}

	async salt() {
		return bcrypt.genSalt();
	}

	async compare(value: string, anotherValue: string) {
		return bcrypt.compare(value, anotherValue);
	}
}
