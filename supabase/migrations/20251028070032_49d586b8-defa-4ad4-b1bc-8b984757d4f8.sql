-- PHASE 9A: Critical Security Fixes
-- Fix RLS policies for profiles and report_templates tables

-- 1. Fix profiles table RLS policy
-- Current issue: Any authenticated user can view ALL profiles (data leak risk)
-- Fix: Restrict to own profile or admin only
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;

CREATE POLICY "Users can view own profile or admins can view all" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id OR has_role(auth.uid(), 'admin'::app_role));

-- 2. Fix report_templates table RLS policy  
-- Current issue: Public access allows anyone (including competitors) to view templates
-- Fix: Require authentication
DROP POLICY IF EXISTS "Anyone can view report templates" ON public.report_templates;

CREATE POLICY "Authenticated users can view report templates"
  ON public.report_templates 
  FOR SELECT
  TO authenticated
  USING (true);