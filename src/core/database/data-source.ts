import { DataSource, DataSourceOptions } from "typeorm";
import {config} from 'dotenv';
config()

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env['TYPEORM_HOST'],
  port: 5432,
  username: process.env['TYPEORM_USERNAME'],
  password: "top_secret",
  database: process.env['TYPEORM_DATABASE'],
  synchronize: true,
  entities: [`${__dirname}/entity/*.entity{.ts,.js}`],
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
}

export default new DataSource(datasourceOptions);
