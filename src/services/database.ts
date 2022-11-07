import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

export async function connect() {
  dotenv.config();
  const { DB_URL, DB_PORT, DB_NAME } = process.env;

  await mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`);
  console.log('Successfully connected to database');
}
