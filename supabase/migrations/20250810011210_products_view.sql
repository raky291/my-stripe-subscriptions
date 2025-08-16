CREATE OR REPLACE VIEW public.products_view AS
SELECT
    p.id                                AS id,
    p.name                              AS name,
    p.description                       AS description,
    p.marketing_features                AS features,
    p.metadata->>'cta'                  AS cta,
    p.metadata->>'popular' = 'true'     AS popular,
    pr.id                               AS price_id,
    pr.unit_amount / 100.0              AS unit_amount,
    UPPER(pr.currency)                  AS currency,
    pr.recurring->>'interval'           AS interval
FROM stripe.products p
INNER JOIN stripe.prices pr ON p.id = pr.product
WHERE p.active = true
    AND pr.active = true;
