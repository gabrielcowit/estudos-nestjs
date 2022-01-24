import { HttpError, HttpException } from '@/core/infra/exception/http';

const ExceptionUntreatedService = (
	message: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'APP-501',
			message: message || `Service exception untreated: ${message}`,
		},
		status ?? 500,
	);
};

const ExceptionUntreatedAPIRest = (
	message: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'APP-502',
			message: message || `Rest exception untreated: ${message}`,
		},
		status ?? 500,
	);
};

export { ExceptionUntreatedService, ExceptionUntreatedAPIRest };
