import { Sidebar } from "@/widgets/layout/ui/Sidebar";
import { Header } from "@/widgets/layout/ui/Header";
import { SidebarProvider, SidebarInset } from '@/shared/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-background flex w-full">
        <Sidebar />
        <SidebarInset>
          <Header title={title} />
          <main className="flex-1 responsive-padding overflow-auto">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}