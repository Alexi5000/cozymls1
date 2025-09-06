import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';
import { useToast } from '@/shared/hooks/use-toast';
import { useReports } from '@/features/reports';
import { ReportTemplate, ReportConfig } from '@/entities/report';
import { Calendar, Filter, BarChart3, Plus, Settings } from 'lucide-react';

const reportConfigSchema = z.object({
  name: z.string().min(1, 'Report name is required'),
  description: z.string().optional(),
  templateId: z.string().min(1, 'Please select a template'),
  chartType: z.enum(['bar', 'line', 'pie', 'area', 'table']).optional(),
  dateStart: z.string().min(1, 'Start date is required'),
  dateEnd: z.string().min(1, 'End date is required'),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  showTotals: z.boolean().optional(),
});

type ReportConfigForm = z.infer<typeof reportConfigSchema>;

interface ReportBuilderProps {
  children?: React.ReactNode;
  onReportGenerated?: (reportId: string) => void;
}

export function ReportBuilder({ children, onReportGenerated }: ReportBuilderProps) {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const { toast } = useToast();
  const { templates, getTemplate, generateReport } = useReports();

  const form = useForm<ReportConfigForm>({
    resolver: zodResolver(reportConfigSchema),
    defaultValues: {
      name: '',
      description: '',
      templateId: '',
      chartType: 'bar',
      dateStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dateEnd: new Date().toISOString().split('T')[0],
      sortOrder: 'desc',
      showTotals: false,
    },
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = getTemplate(templateId);
    setSelectedTemplate(template || null);
    if (template) {
      form.setValue('chartType', template.chartType || 'bar');
    }
  };

  const onSubmit = async (data: ReportConfigForm) => {
    try {
      if (!selectedTemplate) {
        throw new Error('No template selected');
      }

      const config: ReportConfig = {
        dateRange: {
          start: new Date(data.dateStart),
          end: new Date(data.dateEnd),
        },
        filters: [], // Could be expanded with filter UI
        chartType: data.chartType,
        sortBy: data.sortBy,
        sortOrder: data.sortOrder,
        showTotals: data.showTotals,
      };

      const report = generateReport(
        data.templateId,
        config,
        data.name,
        data.description
      );

      toast({
        title: "Report Generated Successfully",
        description: `${data.name} has been created and is ready to view.`,
      });

      onReportGenerated?.(report.id);
      form.reset();
      setSelectedTemplate(null);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-slate-800">
            <BarChart3 className="h-5 w-5" />
            Report Builder
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-display text-slate-800">Select Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate?.id === template.id
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      form.setValue('templateId', template.id);
                      handleTemplateSelect(template.id);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BarChart3 className="h-3 w-3" />
                        {template.chartType || 'table'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Report Configuration */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 font-display text-slate-800">
                        <Settings className="h-4 w-4" />
                        Report Configuration
                      </CardTitle>
                    </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Report Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Q2 Sales Analysis" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description of this report..."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateStart"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Start Date
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateEnd"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="chartType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chart Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select chart type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="bar">Bar Chart</SelectItem>
                                <SelectItem value="line">Line Chart</SelectItem>
                                <SelectItem value="pie">Pie Chart</SelectItem>
                                <SelectItem value="area">Area Chart</SelectItem>
                                <SelectItem value="table">Table</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sortOrder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sort Order</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sort order" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {selectedTemplate && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Template Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">{selectedTemplate.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedTemplate.description}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Fields:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedTemplate.fields.map((field) => (
                              <Badge key={field.id} variant="outline" className="text-xs">
                                {field.label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={form.formState.isSubmitting || !selectedTemplate}
                  >
                    {form.formState.isSubmitting ? 'Generating...' : 'Generate Report'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}