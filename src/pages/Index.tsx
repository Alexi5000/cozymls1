import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { BRAND_NAME, BRAND_DESCRIPTION } from '@/shared/lib/brand';
import { Home, TrendingUp, Users, Shield, Star, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Home,
      title: "Property Management",
      description: "Comprehensive MLS integration with advanced search and filtering capabilities"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Real-time market analytics and performance tracking for your portfolio"
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Streamlined CRM system to manage leads, contacts, and client relationships"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    }
  ];

  const stats = [
    { label: "Properties Listed", value: "25,000+", change: "+15%" },
    { label: "Happy Clients", value: "1,200+", change: "+22%" },
    { label: "Deals Closed", value: "$2.4B+", change: "+18%" },
    { label: "Agent Network", value: "500+", change: "+12%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center px-4 relative">
        <div className="container mx-auto text-center z-10">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 animate-scale-in">
            ✨ Welcome to the Future of Real Estate
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-slide-up">
            {BRAND_NAME}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light animate-slide-up">
            {BRAND_DESCRIPTION} - Transform your real estate business with cutting-edge technology and elegant design
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button size="lg" className="btn-primary px-8 py-4 text-lg font-medium">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of real estate professionals who have transformed their business with our platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="stats-card text-center hover-lift">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change} this month
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and accelerate your growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="luxury-card hover-lift group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-primary rounded-lg p-3 group-hover:animate-glow">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the thousands of real estate professionals who have already made the switch to {BRAND_NAME}
            </p>
            <Button size="lg" className="btn-primary px-8 py-4 text-lg font-medium">
              Start Free Trial <Star className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
