import { useAppData } from '@/app/data-provider';

// Ultra-fast data hooks using pre-loaded context data
export function useInstantProperties() {
  const { properties } = useAppData();
  return {
    properties,
    loading: false,
    error: null,
    total: properties.length,
  };
}

export function useInstantDeals() {
  const { deals } = useAppData();
  return {
    deals,
    loading: false,
    error: null,
    total: deals.length,
  };
}

export function useInstantUsers() {
  const { users } = useAppData();
  return {
    users,
    loading: false,
    error: null,
    total: users.length,
  };
}

export function useInstantContacts() {
  const { contacts } = useAppData();
  return {
    contacts,
    loading: false,
    error: null,
    total: contacts.length,
  };
}

export function useInstantActivities() {
  const { activities } = useAppData();
  return {
    activities,
    loading: false,
    error: null,
    total: activities.length,
  };
}

export function useInstantReports() {
  const { reports } = useAppData();
  return {
    reports,
    loading: false,
    error: null,
    total: reports.length,
  };
}