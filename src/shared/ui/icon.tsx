import { forwardRef, lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

// Re-export from lucide-react to avoid conflicts
export {
  // Navigation
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Home,
  Menu,
  
  // Actions
  Plus,
  Minus,
  X,
  Check,
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Upload,
  Save,
  
  // Communication
  Mail,
  Phone,
  MessageSquare,
  Bell,
  
  // Business
  Users,
  User,
  Building,
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  
  // System
  Settings,
  Cog,
  Info,
  AlertTriangle,
  CheckCircle,
  Circle,
  
  // Media
  Image,
  FileText,
  File,
  Folder,
  
} from 'lucide-react';

// Fallback icon component
const IconFallback = ({ size = 24, className }: { size?: number; className?: string }) => (
  <div
    className={`inline-block bg-muted animate-pulse rounded ${className || ''}`}
    style={{ width: size, height: size }}
    role="img"
    aria-label="Loading icon"
  />
);

// Define the most commonly used icons to bundle directly
export const BundledIcons = {
  ChevronRight: lazy(() => import('lucide-react').then(module => ({ default: module.ChevronRight }))),
  ChevronDown: lazy(() => import('lucide-react').then(module => ({ default: module.ChevronDown }))),
  Check: lazy(() => import('lucide-react').then(module => ({ default: module.Check }))),
  X: lazy(() => import('lucide-react').then(module => ({ default: module.X }))),
  Plus: lazy(() => import('lucide-react').then(module => ({ default: module.Plus }))),
  Search: lazy(() => import('lucide-react').then(module => ({ default: module.Search }))),
  Home: lazy(() => import('lucide-react').then(module => ({ default: module.Home }))),
  Users: lazy(() => import('lucide-react').then(module => ({ default: module.Users }))),
  Mail: lazy(() => import('lucide-react').then(module => ({ default: module.Mail }))),
  Phone: lazy(() => import('lucide-react').then(module => ({ default: module.Phone }))),
  Calendar: lazy(() => import('lucide-react').then(module => ({ default: module.Calendar }))),
  DollarSign: lazy(() => import('lucide-react').then(module => ({ default: module.DollarSign }))),
  TrendingUp: lazy(() => import('lucide-react').then(module => ({ default: module.TrendingUp }))),
  Settings: lazy(() => import('lucide-react').then(module => ({ default: module.Settings }))),
} as const;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports | keyof typeof BundledIcons;
  fallback?: boolean;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, fallback = true, size = 24, ...props }, ref) => {
    const iconSize = typeof size === 'string' ? parseInt(size) || 24 : size;
    
    // Use bundled icons for common icons
    if (name in BundledIcons) {
      const IconComponent = BundledIcons[name as keyof typeof BundledIcons];
      
      return (
        <Suspense fallback={fallback ? <IconFallback size={iconSize} /> : null}>
          <IconComponent ref={ref} size={size} {...props} />
        </Suspense>
      );
    }

    // Use dynamic imports for other icons
    if (name in dynamicIconImports) {
      const IconComponent = lazy(dynamicIconImports[name as keyof typeof dynamicIconImports]);
      
      return (
        <Suspense fallback={fallback ? <IconFallback size={iconSize} /> : null}>
          <IconComponent ref={ref} size={size} {...props} />
        </Suspense>
      );
    }

    // Fallback for unknown icons
    console.warn(`Icon "${name}" not found in lucide-react icons`);
    return fallback ? <IconFallback size={iconSize} /> : null;
  }
);

Icon.displayName = 'Icon';

// Note: Icons are exported above to avoid naming conflicts