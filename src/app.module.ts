import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authModule/authModule';
import { FilmModule } from './filmModule/filmModule';
import { PurchaseModule } from './purchaseModule/purchaseModule';
import { typeOrmConfig } from './typeorm/typeOrmConfig';

@Module({
  imports: [
    AuthModule,
    FilmModule,
    PurchaseModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
