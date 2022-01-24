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
			message: message || `Error to read vehicle(s): ${message}`,
		},
		status || 500,
	);
};

const ExceptionVehicleNotFound = (
	message?: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'VHR-002',
			message: `vehicle not found`,
		},
		status ?? 404,
	);
};

const ExceptionDeleteVehicle = (
	message?: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'VHD-001',
			message: `Failed to delete vehicle: ${message}`,
		},
		status ?? 500,
	);
};

const ExceptionUpdateVehicle = (
	message?: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'VHU-001',
			message: `Failed to update vehicle: ${message}`,
		},
		status ?? 500,
	);
};

export {
	ExceptionUntreatedVehicleCreator,
	ExceptionUntreatedVehicleReader,
	ExceptionVehicleNotFound,
	ExceptionDeleteVehicle,
	ExceptionUpdateVehicle,
};
