import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider, SidebarInset } from '@/shared/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar />
        <SidebarInset>
          <Header title={title} />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}