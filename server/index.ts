import { serve } from 'bun';
import homepage from '../frontend/index.html';

serve({
  port: 8080,
  routes: {
    '/': homepage,
  },
  development: true,
});
