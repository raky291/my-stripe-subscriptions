CREATE OR REPLACE VIEW public.customers_view AS
SELECT
    c.id                    AS id,
    c.user_id               AS user_id
FROM stripe.customers c;
