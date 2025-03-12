import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor(message: any, statusCode: number) {
    super({ status: false, message }, statusCode);
  }
}

export class BadRequestException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class NotFoundException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ForbiddenException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class NotAcceptableException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_ACCEPTABLE);
  }
}

export class RequestTimeoutException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.REQUEST_TIMEOUT);
  }
}

export class ConflictException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}

export class GoneException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.GONE);
  }
}

export class HttpVersionNotSupportedException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.HTTP_VERSION_NOT_SUPPORTED);
  }
}

export class PayloadTooLargeException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.PAYLOAD_TOO_LARGE);
  }
}

export class UnsupportedMediaTypeException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}

export class UnprocessableEntityException extends BaseHttpException {
  constructor(message: any) {
    super(message?.message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class InternalServerErrorException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class NotImplementedException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_IMPLEMENTED);
  }
}

export class ImATeapotException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.I_AM_A_TEAPOT);
  }
}

export class MethodNotAllowedException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.METHOD_NOT_ALLOWED);
  }
}

export class BadGatewayException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_GATEWAY);
  }
}

export class ServiceUnavailableException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class GatewayTimeoutException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.GATEWAY_TIMEOUT);
  }
}

export class PreconditionFailedException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.PRECONDITION_FAILED);
  }
}
