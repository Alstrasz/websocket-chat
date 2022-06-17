import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';


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

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '127.0.0.1';
    await app.listen( port, host, () => {
        console.log( 'App listening at ', port, host );
    } );
}
bootstrap();
