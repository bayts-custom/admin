import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envConfig } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.enableCors({
        // origin: 'http://localhost:3000',
        origin: 'https://bayts-custom.github.io/*',
    });

    await app.listen(envConfig.server.port);
}
bootstrap();
