import { Layout } from '@/widgets/layout';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">404</h1>
            <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
            <p className="text-gray-600 max-w-md">
              Sorry, we couldn't find the page you're looking for. 
              Please check the URL or navigate back to the dashboard.
            </p>
          </div>
          
          <Link to="/">
            <Button className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}