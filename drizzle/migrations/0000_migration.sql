CREATE TABLE public.collaboration_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  company text CHECK (char_length(company) <= 120),
  project_type text NOT NULL CHECK (char_length(project_type) <= 60),
  budget text CHECK (char_length(budget) <= 60),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.collaboration_inquiries TO anon, authenticated;
GRANT ALL ON public.collaboration_inquiries TO service_role;
ALTER TABLE public.collaboration_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an inquiry" ON public.collaboration_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);