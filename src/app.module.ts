import { Module } from '@nestjs/common'
import { PingModule } from './ping/ping.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['stage.dev.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('DB_URL'),
          port: configService.get('DB_PORT'),
          autoLoadEntities: true,
          synchronize: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),
    PingModule,
  ],
})
export class AppModule {}
