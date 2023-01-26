// export stripe secret API key from .env
import dotenv from "dotenv";
dotenv.config();
export const BaseURL = process.env.BASE_URL
export const clientURL = process.env.BASE_URL_CLIENT
export const stripeSecretKey = process.env.STRIPE_PRIVATE_KEY
export const sessionSecret = process.env.SESSION_SECRET