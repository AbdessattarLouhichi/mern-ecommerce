// export stripe secret API key from .env
import dotenv from "dotenv";
dotenv.config();
export const stripeSecretKey = process.env.STRIPE_PRIVATE_KEY
