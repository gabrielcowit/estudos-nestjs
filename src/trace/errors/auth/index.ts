import { HttpError, HttpException } from '@/core/infra/exception/http';

const ExceptionLogin = (message: string, status?: number): HttpError => {
	return HttpException(
		{
			code: 'USRL-001',
			message: `${message}`,
		},
		401,
	);
};

export { ExceptionLogin };
