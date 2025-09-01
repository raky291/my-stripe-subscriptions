CREATE OR REPLACE VIEW public.products_view AS
SELECT
    -- Product information
    p.id                                AS id,
    p.name                              AS name,
    p.description                       AS description,
    p.marketing_features                AS features,
    p.metadata->>'cta'                  AS cta,
    p.metadata->>'popular' = 'true'     AS popular,
    -- Price information
    pr.id                               AS price_id,
    UPPER(pr.currency)                  AS currency,
    pr.unit_amount / 100.0              AS unit_amount,
    pr.recurring->>'interval'           AS interval
FROM stripe.products p
INNER JOIN stripe.prices pr ON p.id = pr.product
WHERE p.active = true AND pr.active = true;
