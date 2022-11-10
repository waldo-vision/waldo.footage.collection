import dotenv from 'dotenv';
import { createConfig, Routing } from 'express-zod-api';
import { createServer } from "express-zod-api";
import { clipRouter } from './routes/clip.route';
import { footageRouter } from './routes/footage.route'
import { connect } from './services/database'
dotenv.config();

// const HOST = `http://${process.env.HOST}` || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

export const zodConfig = createConfig({
  server: {
    listen: 8000, // port or socket
  },
  cors: true,
  logger: {
    level: 'debug',
    color: true,
  },
});
connect()

const APIRouter: Routing = { footage: footageRouter.footage, clip: clipRouter.clip }

createServer(zodConfig, APIRouter)
