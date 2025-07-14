import { User } from "@/entities/user/model/types";

export interface UserFilters {
  role?: User['role'];
  department?: string;
  isActive?: boolean;
  search?: string;
}

export interface UserSortOptions {
  sortBy: 'name' | 'role' | 'department' | 'createdAt' | 'lastLogin';
  sortOrder: 'asc' | 'desc';
}

export interface UserSearchResult {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class UserService {
  private static instance: UserService;
  private users: User[] = [];

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // Initialize with mock data
  async initialize(mockData: User[]): Promise<void> {
    this.users = mockData;
  }

  // Get all users
  async getAll(): Promise<User[]> {
    return [...this.users];
  }

  // Get user by ID
  async getById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  // Search users with filters and pagination
  async search(
    filters: UserFilters = {},
    sortOptions: UserSortOptions = { sortBy: 'name', sortOrder: 'asc' },
    page: number = 1,
    pageSize: number = 20
  ): Promise<UserSearchResult> {
    let filteredUsers = this.applyFilters(this.users, filters);
    filteredUsers = this.applySorting(filteredUsers, sortOptions);

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const users = filteredUsers.slice(start, end);

    return {
      users,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  // Get users by role
  async getByRole(role: User['role']): Promise<User[]> {
    return this.users.filter(u => u.role === role);
  }

  // Get users by department
  async getByDepartment(department: string): Promise<User[]> {
    return this.users.filter(u => u.department === department);
  }

  // Get active users (recently logged in)
  async getActiveUsers(hoursThreshold: number = 24): Promise<User[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hoursThreshold);
    
    return this.users.filter(u => 
      u.lastLogin && u.lastLogin > cutoffTime
    );
  }

  // Get online users (recently logged in within 5 minutes)
  async getOnlineUsers(): Promise<User[]> {
    const cutoffTime = new Date();
    cutoffTime.setMinutes(cutoffTime.getMinutes() - 5);
    
    return this.users.filter(u => 
      u.lastLogin && u.lastLogin > cutoffTime
    );
  }

  // Create new user
  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  // Update user
  async update(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    const updatedUser = {
      ...this.users[userIndex],
      ...updates,
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  // Delete user
  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }

  // Update last login
  async updateLastLogin(id: string): Promise<User | null> {
    return this.update(id, { lastLogin: new Date() });
  }

  // Get user statistics
  async getStats(): Promise<{
    total: number;
    admins: number;
    managers: number;
    agents: number;
    online: number;
    active: number;
    departments: Record<string, number>;
  }> {
    const total = this.users.length;
    const admins = this.users.filter(u => u.role === 'admin').length;
    const managers = this.users.filter(u => u.role === 'manager').length;
    const agents = this.users.filter(u => u.role === 'agent').length;
    const online = (await this.getOnlineUsers()).length;
    const active = (await this.getActiveUsers()).length;
    
    const departments: Record<string, number> = {};
    this.users.forEach(user => {
      if (user.department) {
        departments[user.department] = (departments[user.department] || 0) + 1;
      }
    });

    return {
      total,
      admins,
      managers,
      agents,
      online,
      active,
      departments,
    };
  }

  // Private helper methods
  private applyFilters(users: User[], filters: UserFilters): User[] {
    return users.filter(user => {
      if (filters.role && user.role !== filters.role) return false;
      if (filters.department && user.department !== filters.department) return false;
      if (filters.isActive !== undefined) {
        const isActive = user.lastLogin && 
          (new Date().getTime() - user.lastLogin.getTime()) < 24 * 60 * 60 * 1000; // 24 hours
        if (filters.isActive !== isActive) return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchMatch = 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower) ||
          user.department?.toLowerCase().includes(searchLower);
        if (!searchMatch) return false;
      }
      return true;
    });
  }

  private applySorting(users: User[], sortOptions: UserSortOptions): User[] {
    return [...users].sort((a, b) => {
      const { sortBy, sortOrder } = sortOptions;
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'role':
          comparison = a.role.localeCompare(b.role);
          break;
        case 'department':
          comparison = (a.department || '').localeCompare(b.department || '');
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'lastLogin': {
          const aTime = a.lastLogin?.getTime() || 0;
          const bTime = b.lastLogin?.getTime() || 0;
          comparison = aTime - bTime;
          break;
        }
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}

// Export singleton instance
export const userService = UserService.getInstance();
