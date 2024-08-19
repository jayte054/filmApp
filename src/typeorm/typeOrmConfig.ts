import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';
import { AuthEntity } from 'src/authModule/authEntity';
import { FilmEntity } from 'src/filmModule/filmEntity';
import { PurchaseEntity } from 'src/purchaseModule/purchaseEntity';

const dbConfig: any = config.get('db');
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [ AuthEntity, FilmEntity, PurchaseEntity ],
  synchronize: process.env.TypeORM_SYNC || dbConfig.synchronize,
  migrations: ['dist/migrations/*.js'], // Specify your migration directory,
};
