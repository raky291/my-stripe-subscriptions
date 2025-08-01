import { config } from "dotenv";
import { runMigrations } from "@supabase/stripe-sync-engine";

config();

(async () => {
  if (!process.env.SUPABASE_DATABASE_URL) {
    throw new Error("SUPABASE_DATABASE_URL is not defined");
  }

  await runMigrations({
    databaseUrl: process.env.SUPABASE_DATABASE_URL,
    schema: "stripe",
    logger: console,
  });
})();
