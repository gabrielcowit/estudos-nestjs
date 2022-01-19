import { Injectable } from '@nestjs/common';
import { SecureService } from '@core/SecureService';
import { ExceptionUntreatedAPIRest } from '@core/trace/errors/app';
@Injectable()
export class AppService extends SecureService {
	async getHello() {
		return this.run(async () => {
			throw 'erro nao listado';
		});
	}
}
