import { Layout } from '@/widgets/layout';
import { MobileLayout } from '@/widgets/mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { mockDeals } from '@/entities/deal';
import { mockContacts } from '@/entities/contact';
import { mockActivities } from '@/entities/activity';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

export function ReportsPage() {
  const isMobile = useIsMobile();
  
  // Calculate real statistics from mock data
  const totalSalesValue = mockDeals
    .filter(deal => deal.stage === 'closed-won')
    .reduce((sum, deal) => sum + deal.value, 0);
  
  const activeListings = mockDeals.filter(deal => 
    ['prospect', 'qualified', 'proposal', 'negotiation'].includes(deal.stage)
  ).length;
  
  const totalClients = mockContacts.length;
  
  const totalCommission = totalSalesValue * 0.03; // 3% commission rate
  
  const newContactsThisWeek = mockContacts.filter(contact => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return contact.createdAt > weekAgo;
  }).length;
  
  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const content = (
    <div className="space-y-6">
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
        {/* Sample Report Cards */}
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={isMobile ? "mobile-subtitle" : "text-sm font-medium"}>Sales Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={isMobile ? "mobile-title" : "text-2xl font-bold"}>${totalSalesValue.toLocaleString()}</div>
            <p className={isMobile ? "mobile-caption" : "text-xs text-muted-foreground"}>Closed won deals</p>
          </CardContent>
        </Card>
        
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={isMobile ? "mobile-subtitle" : "text-sm font-medium"}>Active Listings</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={isMobile ? "mobile-title" : "text-2xl font-bold"}>{activeListings}</div>
            <p className={isMobile ? "mobile-caption" : "text-xs text-muted-foreground"}>In pipeline</p>
          </CardContent>
        </Card>
        
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={isMobile ? "mobile-subtitle" : "text-sm font-medium"}>Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={isMobile ? "mobile-title" : "text-2xl font-bold"}>{totalClients}</div>
            <p className={isMobile ? "mobile-caption" : "text-xs text-muted-foreground"}>{newContactsThisWeek} new this week</p>
          </CardContent>
        </Card>
        
        <Card className={isMobile ? "mobile-shadow" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={isMobile ? "mobile-subtitle" : "text-sm font-medium"}>Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={isMobile ? "mobile-title" : "text-2xl font-bold"}>${totalCommission.toLocaleString()}</div>
            <p className={isMobile ? "mobile-caption" : "text-xs text-muted-foreground"}>From closed deals</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Reports Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Your comprehensive analytics and reporting dashboard will be displayed here.
            Track sales performance, market trends, and agent productivity.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout title="Reports" onRefresh={handleRefresh}>
        {content}
      </MobileLayout>
    );
  }

  return (
    <Layout title="Reports">
      {content}
    </Layout>
  );
}