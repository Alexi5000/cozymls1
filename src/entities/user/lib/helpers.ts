import { User } from "@/entities/user/model/types";

export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getUserRoleColor(role: User['role']): string {
  const colors = {
    admin: 'bg-red-500/20 text-red-700 border-red-500/30',
    manager: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
    agent: 'bg-green-500/20 text-green-700 border-green-500/30',
  };
  return colors[role] || 'bg-gray-500/20 text-gray-700 border-gray-500/30';
}

export function getUserRolePriority(role: User['role']): number {
  const priorities = {
    admin: 3,
    manager: 2,
    agent: 1,
  };
  return priorities[role] || 0;
}

export function isUserAdmin(user: User): boolean {
  return user.role === 'admin';
}

export function isUserManager(user: User): boolean {
  return user.role === 'manager';
}

export function isUserAgent(user: User): boolean {
  return user.role === 'agent';
}

export function canUserManageUsers(user: User): boolean {
  return user.role === 'admin';
}

export function canUserManageTeam(user: User): boolean {
  return user.role === 'admin' || user.role === 'manager';
}

export function canUserViewAllData(user: User): boolean {
  return user.role === 'admin' || user.role === 'manager';
}

export function isUserOnline(user: User): boolean {
  if (!user.lastLogin) return false;
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - user.lastLogin.getTime()) / (1000 * 60));
  return diffInMinutes < 5;
}

export function isUserRecentlyActive(user: User): boolean {
  if (!user.lastLogin) return false;
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - user.lastLogin.getTime()) / (1000 * 60));
  return diffInMinutes < 60;
}

export function getUsersByRole(users: User[], role: User['role']): User[] {
  return users.filter(user => user.role === role);
}

export function getUsersByDepartment(users: User[], department: string): User[] {
  return users.filter(user => user.department === department);
}

export function getActiveUsers(users: User[]): User[] {
  return users.filter(user => isUserOnline(user) || isUserRecentlyActive(user));
}

export function getOnlineUsers(users: User[]): User[] {
  return users.filter(user => isUserOnline(user));
}

export function sortUsersByRole(users: User[]): User[] {
  return [...users].sort((a, b) => getUserRolePriority(b.role) - getUserRolePriority(a.role));
}

export function sortUsersByName(users: User[]): User[] {
  return [...users].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortUsersByLastLogin(users: User[]): User[] {
  return [...users].sort((a, b) => {
    if (!a.lastLogin && !b.lastLogin) return 0;
    if (!a.lastLogin) return 1;
    if (!b.lastLogin) return -1;
    return b.lastLogin.getTime() - a.lastLogin.getTime();
  });
}

export function sortUsersByCreatedAt(users: User[]): User[] {
  return [...users].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function searchUsers(users: User[], query: string): User[] {
  const lowerQuery = query.toLowerCase();
  return users.filter(user => 
    user.name.toLowerCase().includes(lowerQuery) ||
    user.email.toLowerCase().includes(lowerQuery) ||
    user.role.toLowerCase().includes(lowerQuery) ||
    user.department?.toLowerCase().includes(lowerQuery)
  );
}

export function getUserStats(users: User[]) {
  const total = users.length;
  const admins = getUsersByRole(users, 'admin').length;
  const managers = getUsersByRole(users, 'manager').length;
  const agents = getUsersByRole(users, 'agent').length;
  const online = getOnlineUsers(users).length;
  const active = getActiveUsers(users).length;
  
  return {
    total,
    admins,
    managers,
    agents,
    online,
    active,
    departments: getDepartmentStats(users),
  };
}

export function getDepartmentStats(users: User[]) {
  const departments: Record<string, number> = {};
  users.forEach(user => {
    if (user.department) {
      departments[user.department] = (departments[user.department] || 0) + 1;
    }
  });
  return departments;
}

export function getUserPermissions(user: User): string[] {
  const basePermissions = ['view_own_data', 'edit_own_profile'];
  
  switch (user.role) {
    case 'admin':
      return [
        ...basePermissions,
        'manage_users',
        'manage_system',
        'view_all_data',
        'generate_reports',
        'manage_properties',
        'manage_deals',
        'manage_contacts',
        'system_configuration',
      ];
    case 'manager':
      return [
        ...basePermissions,
        'manage_team',
        'view_team_data',
        'generate_reports',
        'manage_properties',
        'manage_deals',
        'manage_contacts',
      ];
    case 'agent':
      return [
        ...basePermissions,
        'manage_own_properties',
        'manage_own_deals',
        'manage_own_contacts',
      ];
    default:
      return basePermissions;
  }
}

export function hasPermission(user: User, permission: string): boolean {
  const permissions = getUserPermissions(user);
  return permissions.includes(permission);
}

export function canAccessResource(user: User, resource: 'users' | 'properties' | 'deals' | 'contacts' | 'reports'): boolean {
  switch (resource) {
    case 'users':
      return hasPermission(user, 'manage_users');
    case 'properties':
      return hasPermission(user, 'manage_properties') || hasPermission(user, 'manage_own_properties');
    case 'deals':
      return hasPermission(user, 'manage_deals') || hasPermission(user, 'manage_own_deals');
    case 'contacts':
      return hasPermission(user, 'manage_contacts') || hasPermission(user, 'manage_own_contacts');
    case 'reports':
      return hasPermission(user, 'generate_reports');
    default:
      return false;
  }
}

export function validateUserEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUserPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function generateUserSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getUserDisplayInfo(user: User): {
  name: string;
  initials: string;
  roleColor: string;
  statusColor: string;
  avatar: string;
} {
  return {
    name: user.name,
    initials: getUserInitials(user.name),
    roleColor: getUserRoleColor(user.role),
    statusColor: isUserOnline(user) ? 'bg-green-500' : isUserRecentlyActive(user) ? 'bg-yellow-500' : 'bg-gray-500',
    avatar: user.avatar || '',
  };
}

export function getMentionableUsers(users: User[], currentUser: User): User[] {
  // Return users that the current user can mention/contact
  if (canUserViewAllData(currentUser)) {
    return users.filter(user => user.id !== currentUser.id);
  }
  
  // Agents can only mention users in their department
  return users.filter(user => 
    user.id !== currentUser.id && 
    user.department === currentUser.department
  );
}

export function getRecentUsers(users: User[], limit: number = 5): User[] {
  return sortUsersByLastLogin(users).slice(0, limit);
}

export function getTopPerformers(users: User[], limit: number = 5): User[] {
  // This would typically be based on performance metrics
  // For now, return agents sorted by creation date as a placeholder
  return getUsersByRole(users, 'agent')
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .slice(0, limit);
}
