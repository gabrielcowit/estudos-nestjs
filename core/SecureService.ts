import { HttpError } from '@/core/infra/exception/http';
import { ExceptionUntreatedService } from '@core/trace/errors/app';

export class SecureService {
	async run(runnable, error = ExceptionUntreatedService): Promise<any> {
		try {
			const response = await runnable();
			return response;
		} catch (err) {
			if (err instanceof HttpError) error;
			throw error(err.message);
		}
	}
}
