import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'PORT',
  'NODE_ENV', 
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'EMAIL_ADDRESS',
  'EMAIL_PASSWORD',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const PORT = process.env.PORT!;
export const NODE_ENV = process.env.NODE_ENV!;
export const DATABASE_URL = process.env.DATABASE_URL!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS!;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;