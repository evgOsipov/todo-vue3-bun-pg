import { serve } from 'bun';

import './db/db.ts';
import { routes } from './routes/routes.ts';
import { appConfig } from './config.ts';

serve({
  port: appConfig.port,
  routes,
  development: true,
});
