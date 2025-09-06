import { 
  Home, Users, Building, Search, Plus, Settings, 
  ChevronRight, ChevronDown, Menu, X, Check, Edit, 
  Trash2, Mail, Phone, DollarSign, TrendingUp, BarChart3,
  LucideProps 
} from 'lucide-react';

// Pre-bundled icons for instant loading
const icons = {
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

interface FastIconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof icons;
}

// Instant icon rendering - no lazy loading
export function FastIcon({ name, ...props }: FastIconProps) {
  const IconComponent = icons[name];
  return <IconComponent {...props} />;
}