import { config } from "dotenv";
import { StripeSync } from "@supabase/stripe-sync-engine";

config();

(async () => {
  const databaseUrl = process.env.SUPABASE_DATABASE_URL!;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;

  const stripeSync = new StripeSync({
    databaseUrl,
    schema: "stripe",
    stripeSecretKey,
    stripeWebhookSecret,
    stripeApiVersion: "2025-05-28.basil",
    autoExpandLists: true,
    backfillRelatedEntities: false,
    maxPostgresConnections: 5,
    logger: console,
  });

  await stripeSync.syncBackfill({
    object: "all",
  });
})();
