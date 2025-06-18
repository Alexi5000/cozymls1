
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Users, 
  Globe, 
  Bell, 
  Shield, 
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Save
} from 'lucide-react';

export default function Settings() {
  return (
    <Layout title="Settings">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Agency Settings</h2>
            <p className="text-gray-600 mt-1">Configure your real estate agency preferences</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agency Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="cozy-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building className="h-5 w-5 text-orange-600" />
                  Agency Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="agency-name">Agency Name</Label>
                    <Input id="agency-name" defaultValue="CozyMLS Realty" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="license-number">License Number</Label>
                    <Input id="license-number" defaultValue="RE-2024-789123" className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" defaultValue="123 Main Street, Downtown, CA 90210" className="mt-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" defaultValue="info@cozymls.com" className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.cozymls.com" className="mt-1" />
                </div>
              </CardContent>
            </Card>

            {/* MLS Integration */}
            <Card className="cozy-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                  MLS Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Regional MLS Connected</h4>
                      <p className="text-sm text-gray-600">Last sync: 2 minutes ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mls-id">MLS Provider ID</Label>
                    <Input id="mls-id" defaultValue="RMLS-2024-CA" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" defaultValue="••••••••••••••••" type="password" className="mt-1" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Auto-sync listings</h4>
                    <p className="text-sm text-gray-600">Automatically sync new listings every hour</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Commission Structure */}
            <Card className="cozy-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  Commission Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="listing-commission">Listing Commission (%)</Label>
                    <Input id="listing-commission" defaultValue="3.0" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="buying-commission">Buying Commission (%)</Label>
                    <Input id="buying-commission" defaultValue="3.0" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="agent-split">Agent Split (%)</Label>
                    <Input id="agent-split" defaultValue="70" className="mt-1" />
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-gray-900 mb-2">Commission Calculator Preview</h4>
                  <p className="text-sm text-gray-600">
                    On a $500,000 sale: Total commission $30,000 | Agent receives $21,000 | Agency keeps $9,000
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Team Management */}
            <Card className="cozy-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  Team Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <p className="text-sm text-gray-600">Active Agents</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Agents
                </Button>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Licenses expiring soon</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Training due</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="cozy-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">New listings</h4>
                    <p className="text-xs text-gray-600">Email notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Price changes</h4>
                    <p className="text-xs text-gray-600">SMS alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Showings scheduled</h4>
                    <p className="text-xs text-gray-600">Push notifications</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Contract updates</h4>
                    <p className="text-xs text-gray-600">Email + SMS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="cozy-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Two-factor auth</h4>
                    <p className="text-xs text-gray-600">Required for all agents</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Session timeout</h4>
                    <p className="text-xs text-gray-600">30 minutes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Button variant="outline" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Audit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
