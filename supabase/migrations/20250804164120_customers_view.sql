CREATE VIEW public.customers_view AS
SELECT id, user_id
FROM stripe.customers;
