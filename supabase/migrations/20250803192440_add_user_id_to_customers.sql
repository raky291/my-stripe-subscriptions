alter table "stripe"."customers" add column "user_id" uuid;

alter table "stripe"."customers" add constraint "customers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "stripe"."customers" validate constraint "customers_user_id_fkey";


