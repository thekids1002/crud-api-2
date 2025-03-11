import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { HandleExceptionFilter } from './exception/HandleExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  registerValidation(app);
  app.useGlobalFilters(new HandleExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

function registerValidation(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const mappedErrors = errors.map((error) => ({
          [error.property]: Object.values(error.constraints || {}),
        }));
        return new UnprocessableEntityException({ errors: mappedErrors });
      },
    }),
  );
}
