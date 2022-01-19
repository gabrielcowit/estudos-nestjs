import axios, { AxiosRequestConfig } from 'axios';
import { ExceptionUntreatedAPIRest } from '@core/trace/errors/app';

export class HttpClient {
	static async request(config: AxiosRequestConfig) {
		try {
			const response = await axios.request(config);
			return response;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error;
			} else {
				ExceptionUntreatedAPIRest(error);
			}
		}
	}
}
