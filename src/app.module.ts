import { Module } from '@nestjs/common';
import { PingModule } from './ping/ping.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayTimetableModule } from './day-timetable/daytimetable.module';

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
    DayTimetableModule,
  ],
})
export class AppModule {}
