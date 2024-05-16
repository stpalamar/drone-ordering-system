import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import * as dotEnv from 'dotenv';
const envFilePath: string = `${process.cwd()}/.env`;
dotEnv.config({ path: envFilePath });

export default defineConfig({
    driver: PostgreSqlDriver,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dbName: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    debug: true,
    extensions: [Migrator, SeedManager],
    seeder: {
        path: 'src/common/database/seeder',
    },
});
