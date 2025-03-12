import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    HttpStatus,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

@Catch()
export class HandleExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HandleExceptionFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest<FastifyRequest>()

        let status: number;
        let message: string | object = '';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message = exceptionResponse;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR; // Set status to 500
            message = { message: `Internal server error: (${exception})` };
        }
        const responseR = {
          status: false,
          ...(status === HttpStatus.UNPROCESSABLE_ENTITY && typeof message === 'object' && 'errors' in message 
            ? { errors: message.errors } 
            : { message }),
        }
        this.logger.error(`Status: ${status}, Message: ${JSON.stringify(responseR)}`);
        response.status(status).send(responseR);
    }
}