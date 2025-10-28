import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { logger } from '@/shared/lib/logger';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * Enhanced Error Fallback Component with Logging
 * 
 * Displays a user-friendly error message and provides recovery options.
 * All errors are logged with full context for debugging.
 */
export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const navigate = useNavigate();

  // Log the error with full context
  logger.error('ErrorFallback', 'Component crashed', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });

  const handleGoHome = () => {
    logger.info('ErrorFallback', 'User navigating to home after error');
    navigate('/');
    resetErrorBoundary();
  };

  const handleTryAgain = () => {
    logger.info('ErrorFallback', 'User attempting to reset error boundary');
    resetErrorBoundary();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">🚨 Something Went Wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-center">
            The application encountered an unexpected error. Don't worry, your data is safe.
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleTryAgain} 
              className="w-full gap-2"
              variant="default"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            
            <Button 
              onClick={handleGoHome} 
              variant="outline"
              className="w-full gap-2"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </div>

          {import.meta.env.DEV && error && (
            <details className="mt-4">
              <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                🔍 Error Details (Development Only)
              </summary>
              <div className="mt-2 space-y-2">
                <div className="text-xs bg-muted p-3 rounded-md">
                  <p className="font-semibold text-destructive mb-1">Message:</p>
                  <p className="text-foreground">{error.message}</p>
                </div>
                {error.stack && (
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-40 text-foreground">
                    {error.stack}
                  </pre>
                )}
              </div>
            </details>
          )}

          <p className="text-xs text-center text-muted-foreground">
            If this problem persists, please contact support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
