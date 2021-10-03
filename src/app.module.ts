import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootroot',
      database: 'test',
      entities: [],
      synchronize: true, // SET TO FALSE, before production after migration integrations.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
