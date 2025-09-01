CREATE OR REPLACE VIEW public.subscriptions_view AS
SELECT
    -- Customer information
    c.id                                AS customer_id,
    c.user_id                           AS user_id,
    -- Subscription information
    s.id                                AS id,
    s.status::TEXT                      AS status,
    -- Subscription items information
    si.current_period_end               AS current_period_end,
    -- Price information
    pr.id                               AS price_id,
    UPPER(pr.currency)                  AS price_currency,
    pr.unit_amount / 100.0              AS price_unit_amount,
    pr.recurring->>'interval'           AS price_interval,
    -- Product information
    p.id                                AS product_id,
    p.name                              AS product_name,
    p.description                       AS product_description
FROM stripe.customers c
INNER JOIN stripe.subscriptions s ON c.id = s.customer
INNER JOIN stripe.subscription_items si ON s.id = si.subscription
INNER JOIN stripe.prices pr ON si.price = pr.id
INNER JOIN stripe.products p ON pr.product = p.id
WHERE s.status IN ('active', 'trialing');
