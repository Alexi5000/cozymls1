# Database Schema Documentation

This document provides comprehensive documentation of Haven Estate Suite's database schema, including tables, relationships, and Row Level Security (RLS) policies.

## Overview

Haven Estate Suite uses PostgreSQL as its database, managed through Lovable Cloud (Supabase). The schema is designed with:

- **Normalized structure** for data integrity
- **Row Level Security (RLS)** for multi-tenant isolation
- **Triggers** for automated timestamps
- **Indexes** for query performance
- **Foreign keys** for referential integrity

## Entity Relationship Diagram

```
┌─────────────────┐
│   auth.users    │  (Managed by Supabase Auth)
│  (read-only)    │
└────────┬────────┘
         │
         │ user_id (FK)
         │
         ├──────────────┬──────────────┬──────────────┬──────────────┐
         │              │              │              │              │
┌────────▼────────┐ ┌───▼─────────┐ ┌─▼───────────┐ ┌▼────────────┐ ┌▼────────────┐
│   properties    │ │  contacts   │ │   deals     │ │ activities  │ │  reports    │
│                 │ │             │ │             │ │             │ │             │
│ PK: id          │ │ PK: id      │ │ PK: id      │ │ PK: id      │ │ PK: id      │
│ FK: user_id     │ │ FK: user_id │ │ FK: user_id │ │ FK: user_id │ │ FK: user_id │
│     agent_id    │ │             │ │             │ │             │ │             │
└─────────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

## Core Tables

### Properties Table

Stores real estate property listings.

```sql
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Property Details
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL, -- 'residential', 'commercial', 'land'
  status TEXT NOT NULL, -- 'active', 'pending', 'sold', 'off-market'
  
  -- Location
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  
  -- Pricing
  price DECIMAL(12, 2),
  price_per_sqft DECIMAL(10, 2),
  
  -- Property Features
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  square_feet INTEGER,
  lot_size DECIMAL(10, 2),
  year_built INTEGER,
  
  -- MLS Integration
  mls_number TEXT UNIQUE,
  mls_status TEXT,
  
  -- Media
  images JSONB DEFAULT '[]'::jsonb,
  virtual_tour_url TEXT,
  
  -- Relationships
  agent_id UUID REFERENCES auth.users(id),
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Indexes
  CONSTRAINT valid_status CHECK (status IN ('active', 'pending', 'sold', 'off-market')),
  CONSTRAINT valid_property_type CHECK (property_type IN ('residential', 'commercial', 'land'))
);

-- Indexes for performance
CREATE INDEX idx_properties_user_id ON public.properties(user_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_price ON public.properties(price);
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_mls_number ON public.properties(mls_number);

-- Auto-update timestamp trigger
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

**RLS Policies:**

```sql
-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Users can view their own properties
CREATE POLICY "Users can view own properties"
  ON public.properties FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own properties
CREATE POLICY "Users can insert own properties"
  ON public.properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own properties
CREATE POLICY "Users can update own properties"
  ON public.properties FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own properties
CREATE POLICY "Users can delete own properties"
  ON public.properties FOR DELETE
  USING (auth.uid() = user_id);
```

### Contacts Table

Stores client and lead information.

```sql
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  
  -- Contact Type
  contact_type TEXT NOT NULL, -- 'buyer', 'seller', 'both', 'lead'
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'archived'
  
  -- Address
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  
  -- Preferences
  preferences JSONB DEFAULT '{}'::jsonb,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Relationships
  assigned_agent_id UUID REFERENCES auth.users(id),
  
  -- Notes
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_contacted_at TIMESTAMPTZ,
  
  CONSTRAINT valid_contact_type CHECK (contact_type IN ('buyer', 'seller', 'both', 'lead'))
);

-- Indexes
CREATE INDEX idx_contacts_user_id ON public.contacts(user_id);
CREATE INDEX idx_contacts_email ON public.contacts(email);
CREATE INDEX idx_contacts_type ON public.contacts(contact_type);
CREATE INDEX idx_contacts_status ON public.contacts(status);

-- Auto-update timestamp trigger
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

**RLS Policies:** (Similar pattern to properties table)

### Deals Table

Tracks sales pipeline and transactions.

```sql
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Deal Information
  title TEXT NOT NULL,
  description TEXT,
  deal_value DECIMAL(12, 2),
  commission_rate DECIMAL(5, 2),
  commission_amount DECIMAL(12, 2),
  
  -- Pipeline Stage
  stage TEXT NOT NULL, -- 'lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  
  -- Relationships
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  
  -- Dates
  expected_close_date DATE,
  actual_close_date DATE,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  CONSTRAINT valid_stage CHECK (stage IN ('lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'))
);

-- Indexes
CREATE INDEX idx_deals_user_id ON public.deals(user_id);
CREATE INDEX idx_deals_stage ON public.deals(stage);
CREATE INDEX idx_deals_property_id ON public.deals(property_id);
CREATE INDEX idx_deals_contact_id ON public.deals(contact_id);
CREATE INDEX idx_deals_close_date ON public.deals(expected_close_date);

-- Auto-update timestamp trigger
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

**RLS Policies:** (Similar pattern to properties table)

### Activities Table

Activity timeline and history.

```sql
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Activity Details
  activity_type TEXT NOT NULL, -- 'email', 'call', 'meeting', 'note', 'task'
  title TEXT NOT NULL,
  description TEXT,
  
  -- Related Entities
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  
  -- Scheduling
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  is_completed BOOLEAN DEFAULT false,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  CONSTRAINT valid_activity_type CHECK (activity_type IN ('email', 'call', 'meeting', 'note', 'task'))
);

-- Indexes
CREATE INDEX idx_activities_user_id ON public.activities(user_id);
CREATE INDEX idx_activities_type ON public.activities(activity_type);
CREATE INDEX idx_activities_property_id ON public.activities(property_id);
CREATE INDEX idx_activities_contact_id ON public.activities(contact_id);
CREATE INDEX idx_activities_deal_id ON public.activities(deal_id);
CREATE INDEX idx_activities_scheduled ON public.activities(scheduled_at);
CREATE INDEX idx_activities_completed ON public.activities(is_completed, completed_at);

-- Auto-update timestamp trigger
CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

**RLS Policies:** (Similar pattern to properties table)

### Reports Table

Custom report configurations.

```sql
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Report Details
  name TEXT NOT NULL,
  description TEXT,
  report_type TEXT NOT NULL, -- 'sales', 'properties', 'contacts', 'custom'
  
  -- Configuration
  config JSONB DEFAULT '{}'::jsonb,
  filters JSONB DEFAULT '{}'::jsonb,
  
  -- Metadata
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_run_at TIMESTAMPTZ,
  
  CONSTRAINT valid_report_type CHECK (report_type IN ('sales', 'properties', 'contacts', 'custom'))
);

-- Indexes
CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_reports_type ON public.reports(report_type);
CREATE INDEX idx_reports_favorite ON public.reports(is_favorite);

-- Auto-update timestamp trigger
CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

**RLS Policies:** (Similar pattern to properties table)

## Helper Functions

### Updated At Trigger Function

Automatically updates the `updated_at` timestamp:

```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;
```

## Data Types Reference

| Column Type | PostgreSQL Type | Purpose |
|-------------|----------------|---------|
| UUID | `UUID` | Primary keys, foreign keys |
| Text | `TEXT` | Variable-length strings |
| Number | `INTEGER` | Whole numbers |
| Decimal | `DECIMAL(p,s)` | Precise decimal values (prices) |
| Date | `DATE` | Date only (no time) |
| Timestamp | `TIMESTAMPTZ` | Date + time with timezone |
| Boolean | `BOOLEAN` | True/false values |
| JSON | `JSONB` | Structured data (binary, indexed) |
| Array | `TEXT[]` | Array of text values |

## Naming Conventions

- **Tables**: Plural, lowercase, snake_case (`properties`, `contacts`)
- **Columns**: Singular, lowercase, snake_case (`user_id`, `first_name`)
- **Primary Keys**: Always `id` (UUID)
- **Foreign Keys**: `<table>_id` (`user_id`, `property_id`)
- **Timestamps**: `created_at`, `updated_at`, `<action>_at`
- **Booleans**: `is_<state>`, `has_<feature>` (`is_completed`, `has_garage`)
- **Enums**: Lowercase, hyphen-separated (`closed-won`, `off-market`)

## Migration Strategy

Migrations are managed through Supabase migrations:

1. Create migration file in `supabase/migrations/`
2. Write SQL for schema changes
3. Test locally
4. Deploy via Lovable Cloud

Example migration file naming:
```
20250115120000_create_properties_table.sql
20250115120100_add_mls_fields.sql
```

## Best Practices

### 1. Always Use RLS

```sql
-- Enable on every user-data table
ALTER TABLE public.table_name ENABLE ROW LEVEL SECURITY;
```

### 2. Create Appropriate Indexes

```sql
-- Index frequently queried columns
CREATE INDEX idx_table_column ON public.table_name(column_name);

-- Composite indexes for common queries
CREATE INDEX idx_table_multi ON public.table_name(col1, col2);
```

### 3. Use Constraints

```sql
-- Check constraints for data validation
CONSTRAINT valid_status CHECK (status IN ('active', 'inactive'))

-- Not null for required fields
column_name TEXT NOT NULL

-- Unique for unique identifiers
email TEXT UNIQUE
```

### 4. Foreign Key Cascades

```sql
-- CASCADE: Delete related records
user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE

-- SET NULL: Nullify on delete (optional relationships)
property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL
```

### 5. JSONB for Flexible Data

```sql
-- Use JSONB for dynamic/nested data
preferences JSONB DEFAULT '{}'::jsonb

-- Query JSONB
SELECT * FROM contacts WHERE preferences->>'newsletter' = 'true';

-- Index JSONB paths
CREATE INDEX idx_contacts_prefs ON contacts USING GIN (preferences);
```

## Performance Optimization

### Query Optimization Tips

1. **Use indexes** for WHERE, ORDER BY, JOIN columns
2. **Avoid SELECT *** - select only needed columns
3. **Use EXPLAIN ANALYZE** to check query plans
4. **Batch operations** instead of multiple single queries
5. **Use pagination** for large result sets

### Index Maintenance

```sql
-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;

-- Remove unused indexes
DROP INDEX IF EXISTS idx_unused;
```

## Security Considerations

### RLS Policy Testing

Always test RLS policies with different users:

```sql
-- Test as specific user
SET request.jwt.claim.sub = 'user-uuid';

-- Verify isolation
SELECT * FROM properties; -- Should only show user's data

-- Reset
RESET request.jwt.claim.sub;
```

### Sensitive Data

- Never store passwords directly
- Encrypt sensitive fields if needed
- Use Supabase Vault for secrets
- Audit access to sensitive tables

## Backup Strategy

Lovable Cloud automatically handles backups:

- Daily automated backups
- Point-in-time recovery
- Manual backup creation via dashboard

## Related Documentation

- [Architecture Overview](ARCHITECTURE.md)
- [Security Policy](../../SECURITY.md)
- [API Reference](../api/API_REFERENCE.md)
