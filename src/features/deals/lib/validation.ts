import { z } from 'zod';
import { APP_CONFIG } from '@/shared/constants/app-config';

/**
 * Deal Form Validation Schema
 * 
 * Implements strict validation for deal creation and updates.
 */
export const dealFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .max(APP_CONFIG.LIMITS.MAX_TITLE_LENGTH, { 
      message: `Title must be less than ${APP_CONFIG.LIMITS.MAX_TITLE_LENGTH} characters` 
    }),
  
  contact_id: z
    .string()
    .uuid({ message: 'Invalid contact selected' }),
  
  property_id: z
    .string()
    .uuid({ message: 'Invalid property selected' })
    .optional()
    .nullable(),
  
  value: z
    .number()
    .positive({ message: 'Value must be greater than 0' })
    .max(999999999, { message: 'Value is too large' }),
  
  stage: z
    .enum(['prospect', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'])
    .default(APP_CONFIG.DEFAULTS.DEAL_STAGE),
  
  probability: z
    .number()
    .int()
    .min(0, { message: 'Probability must be at least 0' })
    .max(100, { message: 'Probability must be at most 100' })
    .default(APP_CONFIG.DEFAULTS.DEAL_PROBABILITY),
  
  expected_close_date: z
    .string()
    .min(1, { message: 'Expected close date is required' }),
});

export type DealFormData = z.infer<typeof dealFormSchema>;
