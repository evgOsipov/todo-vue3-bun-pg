import { SQL } from 'bun';
import { initTables } from './init.ts';
import { dbConfig } from '../config.ts';

export const pg = new SQL(dbConfig);

await initTables(pg);
