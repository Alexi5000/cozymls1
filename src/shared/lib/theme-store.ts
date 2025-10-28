import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  autoRefresh: boolean;
  notifications: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setAutoRefresh: (value: boolean) => void;
  setNotifications: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      autoRefresh: true,
      notifications: true,
      
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
      
      setAutoRefresh: (value) => set({ autoRefresh: value }),
      setNotifications: (value) => set({ notifications: value }),
    }),
    {
      name: 'cozymls-theme',
      onRehydrateStorage: () => (state) => {
        // Apply theme on initial load
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);
