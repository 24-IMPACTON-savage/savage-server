import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Express } from 'express';

configDotenv()

async function bootstrap() {
    const port = Number(process.env.PORT) || 8000
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('농노') 
        .setDescription('by savage') 
        .setVersion('0.0.1') 
        .addTag('IMPACTHON') 
        .build();
    const doc = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/docs', app, doc);

	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

    await app.listen(port);
}
bootstrap();
