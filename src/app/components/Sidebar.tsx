import { Link, useLocation } from 'react-router';
import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
  basePath: string;
}

export default function Sidebar({ items, basePath }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen sticky top-0">
      <div className="p-6">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === `${basePath}${item.path}`;

          return (
            <Link
              key={item.path}
              to={`${basePath}${item.path}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] mb-2 transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
