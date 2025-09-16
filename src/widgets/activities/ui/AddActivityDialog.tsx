import { useState } from 'react';
import { Calendar, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Calendar as CalendarComponent } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/lib/utils';
import { mockContacts } from '@/entities/contact';
import { toast } from 'sonner';

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddActivityDialog({ open, onOpenChange }: AddActivityDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'task',
    priority: 'medium',
    contactId: '',
    dueDate: undefined as Date | undefined,
    dueTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title for the activity');
      return;
    }

    // Here you would typically save the activity
    toast.success('Activity created successfully!');
    
    // Reset form and close dialog
    setFormData({
      title: '',
      description: '',
      type: 'task',
      priority: 'medium',
      contactId: '',
      dueDate: undefined,
      dueTime: '',
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogDescription>
            Create a new task, call, meeting, email, or note to track your work.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter activity title..."
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact (Optional)</Label>
              <Select value={formData.contactId} onValueChange={(value) => handleInputChange('contactId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contact..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No contact</SelectItem>
                  {mockContacts.slice(0, 10).map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Due Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.dueDate}
                      onSelect={(date) => handleInputChange('dueDate', date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueTime">Due Time (Optional)</Label>
                <Input
                  id="dueTime"
                  type="time"
                  value={formData.dueTime}
                  onChange={(e) => handleInputChange('dueTime', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Enter activity description..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Activity</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}