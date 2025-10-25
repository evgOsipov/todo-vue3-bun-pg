import { serve } from 'bun';

import './db/db.ts';
import { routes } from './routes/routes.ts';

serve({
  port: 8080,
  routes,
  development: true,
});
