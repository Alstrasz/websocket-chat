import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export function setup_swagger ( app: INestApplication ) {
    const config = new DocumentBuilder()
        .setTitle( 'websocket-nest' )
        .setDescription( 'Api descciption of websocket-nest, project build to learn websocket and typeorm. App used to chat. For that there is a websocket, room storage and auth' )
        .setVersion( '1.0.0' )
        .addTag( 'App' )
        .addBearerAuth( {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'JWT token issued when logged in \ registered',
        } )
        .build();
    const document = SwaggerModule.createDocument( app, config );
    SwaggerModule.setup( 'api', app, document );
}


async function bootstrap () {
    const app = await NestFactory.create( AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    } );
    app.useWebSocketAdapter( new WsAdapter( app ) );

    app.useGlobalInterceptors( new ClassSerializerInterceptor( app.get( Reflector ) ) );
    app.useGlobalPipes( new ValidationPipe( {
        whitelist: true,
    } ) );
    app.enableCors();

    setup_swagger( app );

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '127.0.0.1';
    await app.listen( port, host, () => {
        console.log( 'App listening at ', port, host );
    } );
}
bootstrap();
