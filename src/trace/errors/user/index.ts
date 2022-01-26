import { HttpError, HttpException } from '@/core/infra/exception/http';

const ExceptionUntreatedUserCreator = (
	message: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'USRC-001',
			message: `Error to create new user: ${message}`,
		},
		status || 500,
	);
};

const ExceptionUntreatedUserReader = (
	message: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'USRR-001',
			message: `Error to read user(s): ${message}`,
		},
		status || 500,
	);
};

const ExceptionConflictUser = (message?: string): HttpError => {
	return HttpException(
		{
			code: 'USRC-002',
			message: `username already exists`,
		},
		409,
	);
};

const ExceptionUserNotFound = (
	message?: string,
	status?: number,
): HttpError => {
	return HttpException(
		{
			code: 'USRR-002',
			message: `user not found`,
		},
		status ?? 404,
	);
};

const ExceptionDeleteUser = (message?: string, status?: number): HttpError => {
	return HttpException(
		{
			code: 'USRD-001',
			message: `Failed to delete user: ${message}`,
		},
		status ?? 500,
	);
};

const ExceptionUpdateUser = (message?: string, status?: number): HttpError => {
	return HttpException(
		{
			code: 'USRU-001',
			message: `Failed to update user: ${message}`,
		},
		status ?? 500,
	);
};

export {
	ExceptionUntreatedUserCreator,
	ExceptionUntreatedUserReader,
	ExceptionUserNotFound,
	ExceptionDeleteUser,
	ExceptionUpdateUser,
	ExceptionConflictUser,
};
