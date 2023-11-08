import { DataSource, DataSourceOptions } from "typeorm";
import process from "process";

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env['TYPEORM_HOST'],
  port: 5432,
  username: process.env['TYPEORM_USERNAME'],
  password: "top_secret",
  database: process.env['TYPEORM_DATABASE'],
  synchronize: false,
  logging: true,
  entities: [`${__dirname}/common/Entity/*.entity{.ts,.js}`],
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/common/migrations/*{.ts,.js}`],
}

export default new DataSource(datasourceOptions);
