import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { WebsocketModule } from './websocket/websocket.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    // Global configuration module to load environment variables from .env file
    ConfigModule.forRoot({ isGlobal: true }),

    // MongoDB connection using Mongoose, with async configuration to read from environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('MONGO_URI is not defined in .env');
        }
        return { uri };
      },
      inject: [ConfigService],
    }),

    // Modules 
    DomainModule,
    WebsocketModule
  ],
})
export class AppModule {}