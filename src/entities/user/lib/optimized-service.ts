import { User, mockUsers } from '@/entities/user';

// Instant user service - no artificial delays
export class OptimizedUserService {
  private static instance: OptimizedUserService;
  private users: User[] = mockUsers;

  static getInstance(): OptimizedUserService {
    if (!OptimizedUserService.instance) {
      OptimizedUserService.instance = new OptimizedUserService();
    }
    return OptimizedUserService.instance;
  }

  // Instant data access
  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User | null {
    return this.users.find(user => user.id === id) || null;
  }

  getByRole(role: User['role']): User[] {
    return this.users.filter(user => user.role === role);
  }

  getActiveUsers(): User[] {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    return this.users.filter(user => new Date(user.lastLogin) > fiveMinutesAgo);
  }

  // Instant stats calculation
  getStats() {
    const totalUsers = this.users.length;
    const activeUsers = this.getActiveUsers().length;
    const agents = this.getByRole('agent').length;
    const admins = this.getByRole('admin').length;

    return {
      totalUsers,
      activeUsers,
      agents,
      admins,
      activeRate: totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0,
    };
  }
}

export const optimizedUserService = OptimizedUserService.getInstance();