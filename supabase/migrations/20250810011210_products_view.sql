CREATE OR REPLACE VIEW public.products_view AS
SELECT
    p.id                            AS id,
    p.name                          AS name,
    p.description                   AS description,
    pr.id                           AS price_id,
    pr.unit_amount                  AS unit_amount,
    pr.currency                     AS currency,
    pr.recurring->>'interval'       AS recurring_interval
FROM stripe.products p
INNER JOIN stripe.prices pr ON p.id = pr.product;
