
-- 1. Replace get_dashboard_stats: drop user_id param, use auth.uid() internally
DROP FUNCTION IF EXISTS public.get_dashboard_stats(uuid);

CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
RETURNS TABLE(total_contacts bigint, active_deals bigint, total_revenue numeric, monthly_growth numeric)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
  current_month_revenue numeric;
  last_month_revenue numeric;
begin
  if _uid is null then
    raise exception 'Not authenticated';
  end if;

  select coalesce(sum(value), 0) into current_month_revenue
  from public.deals
  where agent_id = _uid
    and stage = 'closed-won'
    and extract(month from created_at) = extract(month from current_date)
    and extract(year from created_at) = extract(year from current_date);

  select coalesce(sum(value), 0) into last_month_revenue
  from public.deals
  where agent_id = _uid
    and stage = 'closed-won'
    and extract(month from created_at) = extract(month from current_date - interval '1 month')
    and extract(year from created_at) = extract(year from current_date - interval '1 month');

  return query
  select
    (select count(*) from public.contacts where created_by = _uid),
    (select count(*) from public.deals where agent_id = _uid and stage not in ('closed-won', 'closed-lost')),
    current_month_revenue,
    case when last_month_revenue > 0
      then ((current_month_revenue - last_month_revenue) / last_month_revenue * 100)
      else 0
    end;
end;
$function$;

-- 2. Revoke anon execute on SECURITY DEFINER functions; only authenticated may call
REVOKE EXECUTE ON FUNCTION public.get_dashboard_stats() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_dashboard_stats() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
