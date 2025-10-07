-- Fix security warnings: Set search_path for functions

-- Update handle_updated_at function
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Update update_days_on_market function
create or replace function public.update_days_on_market()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.days_on_market = current_date - new.listing_date;
  return new;
end;
$$;