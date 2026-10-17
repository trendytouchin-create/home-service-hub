CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  pincode text,
  notes text,
  preferred_date date NOT NULL,
  time_slot text NOT NULL,
  status text NOT NULL DEFAULT 'new'
);
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;