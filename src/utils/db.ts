import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const CONNECTION_STRING = process.env.DATABASE_URI;

export const client = postgres(CONNECTION_STRING as string, { prepare: false });
export const db = drizzle(client);
