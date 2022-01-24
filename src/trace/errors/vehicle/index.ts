import { HttpError, HttpException } from '@/core/infra/exception/http';

const ExceptionUntreatedVehicleCreator = (
	message: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'VHC-001',
			message: message || `Error to create new vehicle: ${message}`,
		},
		status || 500,
	);
};

const ExceptionUntreatedVehicleReader = (
	message: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'VHR-001',
			message: message || `Error to read vehicle: ${message}`,
		},
		status || 500,
	);
};

const ExceptionVehicleNotFound = (): HttpError => {
	return HttpException(
		{
			code: 'VHR-002',
			message: `vehicle not found`,
		},
		404,
	);
};

export {
	ExceptionUntreatedVehicleCreator,
	ExceptionUntreatedVehicleReader,
	ExceptionVehicleNotFound,
};
