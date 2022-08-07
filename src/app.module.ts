import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClimberProfileModule } from './climber-profile/climber-profile.module';
import { ClimbAvailabilityGenModule } from './climb-availability-gen/climb-availability-gen.module';
import { ClimbAvailabilityScheduledModule } from './climb-availability-scheduled/climb-availability-scheduled.module';
import { ClimbRequestModule } from './climb-request/climb-request.module';
import { ClimbMessageModule } from './climb-message/climb-message.module';
import { S3Service } from './services/s3/s3.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    ClimberProfileModule,
    ClimbAvailabilityGenModule,
    ClimbAvailabilityScheduledModule,
    ClimbRequestModule,
    ClimbMessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
