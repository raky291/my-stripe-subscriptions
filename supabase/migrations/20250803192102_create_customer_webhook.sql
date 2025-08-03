CREATE TRIGGER "create-customer" AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:3000/api/create-customer', 'POST', '{}', '{}', '5000');


