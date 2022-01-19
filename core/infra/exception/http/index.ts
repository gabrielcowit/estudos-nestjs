import { HttpException as HttpError } from '@nestjs/common';

interface IError {
	code: string;
	message: string;
}

const HttpException = (error: IError, status: number): HttpError => {
	return new HttpError(error, status);
};

export { HttpError, HttpException };
