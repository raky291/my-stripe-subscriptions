import { runMigrations } from "@supabase/stripe-sync-engine";
import { config } from "dotenv";

config();

(async () => {
  const databaseUrl = process.env.SUPABASE_DATABASE_URL!;

  await runMigrations({
    databaseUrl,
    schema: "stripe",
    logger: console,
  });
})();
