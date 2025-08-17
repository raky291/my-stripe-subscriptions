CREATE OR REPLACE VIEW public.subscriptions_view AS
SELECT
    s.id                    AS id,
    c.id                    AS customer_id,
    c.user_id               AS user_id,
    s.status::TEXT          AS status
FROM stripe.customers c
INNER JOIN stripe.subscriptions s ON c.id = s.customer
WHERE s.status IN ('active', 'trialing');
