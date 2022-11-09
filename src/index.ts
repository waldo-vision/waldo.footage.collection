import dotenv from 'dotenv';
import { createConfig } from 'express-zod-api';

dotenv.config();

// const HOST = `http://${process.env.HOST}` || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

export const zodConfig = createConfig({
  server: {
    listen: PORT, // port or socket
  },
  cors: true,
  logger: {
    level: 'debug',
    color: true,
  },
});
