import { z } from 'zod';
import { APP_CONFIG } from '@/shared/constants/app-config';

/**
 * Activity Form Validation Schema
 * 
 * Implements strict validation for activity creation and updates.
 */
export const activityFormSchema = z.object({
  type: z.enum(['call', 'email', 'meeting', 'task', 'note']),
  
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .max(APP_CONFIG.LIMITS.MAX_TITLE_LENGTH, { 
      message: `Title must be less than ${APP_CONFIG.LIMITS.MAX_TITLE_LENGTH} characters` 
    }),
  
  description: z
    .string()
    .trim()
    .max(APP_CONFIG.LIMITS.MAX_DESCRIPTION_LENGTH, { 
      message: `Description must be less than ${APP_CONFIG.LIMITS.MAX_DESCRIPTION_LENGTH} characters` 
    })
    .optional(),
  
  contact_id: z
    .string()
    .uuid({ message: 'Invalid contact selected' })
    .optional()
    .nullable(),
  
  deal_id: z
    .string()
    .uuid({ message: 'Invalid deal selected' })
    .optional()
    .nullable(),
  
  priority: z
    .enum(['low', 'medium', 'high'])
    .default(APP_CONFIG.DEFAULTS.ACTIVITY_PRIORITY),
  
  due_date: z
    .string()
    .optional()
    .nullable(),
});

export type ActivityFormData = z.infer<typeof activityFormSchema>;
