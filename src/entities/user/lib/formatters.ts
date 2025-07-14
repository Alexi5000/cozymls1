import { User } from "@/entities/user/model/types";

export function formatUserRole(role: User['role']): string {
  const roleMap = {
    admin: 'Administrator',
    agent: 'Agent',
    manager: 'Manager',
  };
  return roleMap[role] || role;
}

export function formatUserName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

export function formatLastLogin(lastLogin: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - lastLogin.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

export function formatUserCreatedAt(createdAt: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(createdAt);
}

export function formatUserStatus(lastLogin?: Date): 'online' | 'recently_active' | 'offline' {
  if (!lastLogin) return 'offline';
  
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 5) return 'online';
  if (diffInMinutes < 60) return 'recently_active';
  return 'offline';
}

export function formatUserEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format as US phone number if 10 digits
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Return original if can't format
  return phone;
}

export function formatUserDisplayName(user: User): string {
  return user.name || user.email.split('@')[0];
}

export function formatUserRoleDescription(role: User['role']): string {
  const descriptions = {
    admin: 'Full system access and management capabilities',
    manager: 'Team management and oversight responsibilities',
    agent: 'Client interaction and property management',
  };
  return descriptions[role] || 'Standard user access';
}

export function formatUserSummary(user: User): string {
  const role = formatUserRole(user.role);
  const department = user.department ? ` in ${user.department}` : '';
  const lastLogin = user.lastLogin ? ` • Last active ${formatLastLogin(user.lastLogin)}` : '';
  
  return `${role}${department}${lastLogin}`;
}

export function formatUserInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatUserAvatar(user: User): string {
  if (user.avatar) return user.avatar;
  
  // Generate a placeholder avatar URL based on initials
  const initials = formatUserInitials(user.name);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=128`;
}

export function formatUserPermissions(role: User['role']): string[] {
  const permissions = {
    admin: [
      'Manage users',
      'System configuration',
      'View all data',
      'Generate reports',
      'Manage properties',
      'Manage deals',
      'Manage contacts',
    ],
    manager: [
      'Manage team',
      'View team data',
      'Generate reports',
      'Manage properties',
      'Manage deals',
      'Manage contacts',
    ],
    agent: [
      'Manage own properties',
      'Manage own deals',
      'Manage own contacts',
      'View own data',
    ],
  };
  return permissions[role] || [];
}

export function formatUserActivity(user: User): string {
  const status = formatUserStatus(user.lastLogin);
  const statusText = {
    online: 'Online now',
    recently_active: 'Recently active',
    offline: user.lastLogin ? `Last seen ${formatLastLogin(user.lastLogin)}` : 'Never logged in',
  };
  return statusText[status];
}
