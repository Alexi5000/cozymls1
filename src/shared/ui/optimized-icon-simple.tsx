import { forwardRef } from 'react';
import { LucideProps } from 'lucide-react';

// Most commonly used icons - bundled for performance
import {
  Home,
  Users,
  Building,
  Search,
  Plus,
  Settings,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Check,
  Edit,
  Trash2,
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

const coreIcons = {
  home: Home,
  users: Users,
  building: Building,
  search: Search,
  plus: Plus,
  settings: Settings,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  menu: Menu,
  x: X,
  check: Check,
  edit: Edit,
  trash: Trash2,
  mail: Mail,
  phone: Phone,
  dollar: DollarSign,
  trending: TrendingUp,
  chart: BarChart3,
} as const;

interface CoreIconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof coreIcons;
}

export const CoreIcon = forwardRef<SVGSVGElement, CoreIconProps>(
  ({ name, size = 24, ...props }, ref) => {
    const IconComponent = coreIcons[name];
    return <IconComponent ref={ref} size={size} {...props} />;
  }
);

CoreIcon.displayName = 'CoreIcon';

// Export commonly used icons directly for tree shaking
export {
  Home,
  Users,
  Building,
  Search,
  Plus,
  Settings,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Check,
  Edit,
  Trash2,
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  BarChart3,
};