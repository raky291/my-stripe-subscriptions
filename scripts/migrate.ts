import { config } from "dotenv";
import { runMigrations } from "@supabase/stripe-sync-engine";

config();

(async () => {
  const databaseUrl = process.env.SUPABASE_DATABASE_URL!;

  await runMigrations({
    databaseUrl,
    schema: "stripe",
    logger: console,
  });
})();
