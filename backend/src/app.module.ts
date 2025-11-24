import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Import de tes modules métier
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Charge les variables d'environnement (.env)
    ConfigModule.forRoot({ isGlobal: true }),

    // Connexion MongoDB avec ConfigService
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

    // Modules métier
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}