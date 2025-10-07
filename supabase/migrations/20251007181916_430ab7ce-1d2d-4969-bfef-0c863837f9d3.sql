-- Phase 1: Database Schema Design & Setup (Fixed)
-- Create enums for type safety
create type public.app_role as enum ('admin', 'agent', 'manager');
create type public.contact_status as enum ('lead', 'prospect', 'client');
create type public.deal_stage as enum ('prospect', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost');
create type public.property_type as enum ('house', 'apartment', 'townhouse', 'duplex', 'land', 'commercial');
create type public.property_status as enum ('active', 'pending', 'sold', 'off-market');
create type public.activity_type as enum ('call', 'email', 'meeting', 'task', 'note');
create type public.activity_priority as enum ('low', 'medium', 'high');
create type public.report_category as enum ('sales', 'properties', 'agents', 'market', 'financial');

-- 1. User Roles Table (CRITICAL: Separate from profiles for security)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz default now() not null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Security definer function to check roles (prevents RLS recursion)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- 2. Profiles Table (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  avatar_url text,
  department text,
  last_login timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

-- 3. Properties Table
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  mls_id text unique not null,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  price numeric not null,
  bedrooms integer not null,
  bathrooms numeric not null,
  square_feet integer not null,
  lot_size integer not null,
  year_built integer not null,
  property_type property_type not null,
  status property_status not null default 'active',
  listing_date date not null default current_date,
  days_on_market integer not null default 0,
  description text not null,
  features text[] default array[]::text[],
  images text[] default array[]::text[],
  agent_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.properties enable row level security;

-- Indexes for properties
create index idx_properties_status on public.properties(status);
create index idx_properties_price on public.properties(price);
create index idx_properties_city on public.properties(city);
create index idx_properties_agent on public.properties(agent_id);
create index idx_properties_features on public.properties using gin(features);

-- 4. Contacts Table
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  status contact_status not null default 'lead',
  tags text[] default array[]::text[],
  last_contact timestamptz not null default now(),
  notes text,
  created_by uuid references public.profiles(id) on delete set null not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.contacts enable row level security;

-- Indexes for contacts
create index idx_contacts_status on public.contacts(status);
create index idx_contacts_tags on public.contacts using gin(tags);
create index idx_contacts_created_by on public.contacts(created_by);

-- 5. Deals Table
create table public.deals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  contact_id uuid references public.contacts(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete set null,
  agent_id uuid references public.profiles(id) on delete set null not null,
  value numeric not null,
  stage deal_stage not null default 'prospect',
  probability integer not null default 0 check (probability >= 0 and probability <= 100),
  expected_close_date date not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.deals enable row level security;

-- Indexes for deals
create index idx_deals_stage on public.deals(stage);
create index idx_deals_agent on public.deals(agent_id);
create index idx_deals_contact on public.deals(contact_id);

-- 6. Activities Table
create table public.activities (
  id uuid primary key default gen_random_uuid(),
  type activity_type not null,
  title text not null,
  description text,
  contact_id uuid references public.contacts(id) on delete set null,
  deal_id uuid references public.deals(id) on delete set null,
  priority activity_priority not null default 'medium',
  due_date timestamptz,
  completed_at timestamptz,
  assigned_to uuid references public.profiles(id) on delete set null not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.activities enable row level security;

-- Indexes for activities
create index idx_activities_assigned on public.activities(assigned_to);
create index idx_activities_due_date on public.activities(due_date);
create index idx_activities_completed on public.activities(completed_at);

-- 7. Report Templates Table
create table public.report_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  category report_category not null,
  fields jsonb not null default '[]'::jsonb,
  chart_type text,
  created_by uuid references public.profiles(id) on delete set null not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.report_templates enable row level security;

-- 8. Reports Table
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references public.report_templates(id) on delete cascade not null,
  name text not null,
  description text,
  data jsonb not null default '[]'::jsonb,
  config jsonb not null default '{}'::jsonb,
  generated_by uuid references public.profiles(id) on delete set null not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.reports enable row level security;

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- User Roles Policies
create policy "Users can view their own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

create policy "Admins can manage all roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'));

-- Profiles Policies
create policy "Users can view all profiles"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "System can insert profiles"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Properties Policies
create policy "Anyone can view active properties"
  on public.properties for select
  using (status = 'active' or auth.uid() = agent_id or public.has_role(auth.uid(), 'admin'));

create policy "Agents can create properties"
  on public.properties for insert
  with check (auth.uid() = agent_id);

create policy "Agents can update their own properties"
  on public.properties for update
  using (auth.uid() = agent_id or public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete properties"
  on public.properties for delete
  using (public.has_role(auth.uid(), 'admin'));

-- Contacts Policies
create policy "Users can view contacts they created"
  on public.contacts for select
  using (auth.uid() = created_by or public.has_role(auth.uid(), 'admin'));

create policy "Users can create contacts"
  on public.contacts for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own contacts"
  on public.contacts for update
  using (auth.uid() = created_by or public.has_role(auth.uid(), 'admin'));

create policy "Users can delete their own contacts"
  on public.contacts for delete
  using (auth.uid() = created_by or public.has_role(auth.uid(), 'admin'));

-- Deals Policies
create policy "Users can view their own deals"
  on public.deals for select
  using (auth.uid() = agent_id or public.has_role(auth.uid(), 'admin'));

create policy "Agents can create deals"
  on public.deals for insert
  with check (auth.uid() = agent_id);

create policy "Agents can update their own deals"
  on public.deals for update
  using (auth.uid() = agent_id or public.has_role(auth.uid(), 'admin'));

create policy "Agents can delete their own deals"
  on public.deals for delete
  using (auth.uid() = agent_id or public.has_role(auth.uid(), 'admin'));

-- Activities Policies
create policy "Users can view assigned activities"
  on public.activities for select
  using (auth.uid() = assigned_to or public.has_role(auth.uid(), 'admin'));

create policy "Users can create activities"
  on public.activities for insert
  with check (auth.uid() = assigned_to);

create policy "Users can update their activities"
  on public.activities for update
  using (auth.uid() = assigned_to or public.has_role(auth.uid(), 'admin'));

create policy "Users can delete their activities"
  on public.activities for delete
  using (auth.uid() = assigned_to or public.has_role(auth.uid(), 'admin'));

-- Report Templates Policies
create policy "Anyone can view report templates"
  on public.report_templates for select
  using (true);

create policy "Admins can manage report templates"
  on public.report_templates for all
  using (public.has_role(auth.uid(), 'admin'));

-- Reports Policies
create policy "Users can view their own reports"
  on public.reports for select
  using (auth.uid() = generated_by or public.has_role(auth.uid(), 'admin'));

create policy "Users can create reports"
  on public.reports for insert
  with check (auth.uid() = generated_by);

create policy "Users can update their own reports"
  on public.reports for update
  using (auth.uid() = generated_by or public.has_role(auth.uid(), 'admin'));

create policy "Users can delete their own reports"
  on public.reports for delete
  using (auth.uid() = generated_by or public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- TRIGGERS & FUNCTIONS
-- ==========================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply updated_at triggers
create trigger set_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.properties
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.contacts
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.deals
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.activities
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.report_templates
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.reports
  for each row execute function public.handle_updated_at();

-- Function to calculate and update days_on_market
create or replace function public.update_days_on_market()
returns trigger
language plpgsql
as $$
begin
  new.days_on_market = current_date - new.listing_date;
  return new;
end;
$$;

-- Trigger to update days_on_market on insert and update
create trigger set_days_on_market
  before insert or update on public.properties
  for each row execute function public.update_days_on_market();

-- Function to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  
  -- Assign default 'agent' role to new users
  insert into public.user_roles (user_id, role)
  values (new.id, 'agent');
  
  return new;
end;
$$;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to get dashboard stats
create or replace function public.get_dashboard_stats(user_id uuid)
returns table (
  total_contacts bigint,
  active_deals bigint,
  total_revenue numeric,
  monthly_growth numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_month_revenue numeric;
  last_month_revenue numeric;
begin
  -- Get current month revenue
  select coalesce(sum(value), 0) into current_month_revenue
  from public.deals
  where agent_id = user_id
    and stage = 'closed-won'
    and extract(month from created_at) = extract(month from current_date)
    and extract(year from created_at) = extract(year from current_date);
  
  -- Get last month revenue
  select coalesce(sum(value), 0) into last_month_revenue
  from public.deals
  where agent_id = user_id
    and stage = 'closed-won'
    and extract(month from created_at) = extract(month from current_date - interval '1 month')
    and extract(year from created_at) = extract(year from current_date - interval '1 month');
  
  return query
  select
    (select count(*) from public.contacts where created_by = user_id),
    (select count(*) from public.deals where agent_id = user_id and stage not in ('closed-won', 'closed-lost')),
    current_month_revenue,
    case when last_month_revenue > 0 
      then ((current_month_revenue - last_month_revenue) / last_month_revenue * 100)
      else 0
    end;
end;
$$;