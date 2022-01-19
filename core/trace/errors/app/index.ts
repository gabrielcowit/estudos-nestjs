import { HttpError, HttpException } from '@/core/infra/exception/http';

const ExceptionUntreatedService = (message: string): HttpError => {
    return HttpException(
        {
            code: 'APP-501',
            message: message || `Service exception untreated: ${message}`,
        },
        500,
    );
};

const ExceptionUntreatedAPIRest = (message: string): HttpError => {
    return HttpException(
        {
            code: 'APP-502',
            message: message || `Rest exception untreated: ${message}`,
        },
        500,
    );
};

export { ExceptionUntreatedService, ExceptionUntreatedAPIRest };
