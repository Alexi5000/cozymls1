import { z } from 'zod';
import { APP_CONFIG } from '@/shared/constants/app-config';

/**
 * Contact Form Validation Schema
 * 
 * Implements strict validation with length limits and proper sanitization
 * to prevent injection attacks and data corruption.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(APP_CONFIG.LIMITS.MAX_NAME_LENGTH, { 
      message: `Name must be less than ${APP_CONFIG.LIMITS.MAX_NAME_LENGTH} characters` 
    }),
  
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .max(APP_CONFIG.LIMITS.MAX_EMAIL_LENGTH, { 
      message: `Email must be less than ${APP_CONFIG.LIMITS.MAX_EMAIL_LENGTH} characters` 
    }),
  
  phone: z
    .string()
    .trim()
    .min(1, { message: 'Phone is required' })
    .max(APP_CONFIG.LIMITS.MAX_PHONE_LENGTH, { 
      message: `Phone must be less than ${APP_CONFIG.LIMITS.MAX_PHONE_LENGTH} characters` 
    }),
  
  company: z
    .string()
    .trim()
    .max(APP_CONFIG.LIMITS.MAX_NAME_LENGTH, { 
      message: `Company must be less than ${APP_CONFIG.LIMITS.MAX_NAME_LENGTH} characters` 
    })
    .optional(),
  
  status: z.enum(['lead', 'prospect', 'client']).default(APP_CONFIG.DEFAULTS.CONTACT_STATUS),
  
  tags: z
    .array(z.string().trim())
    .max(APP_CONFIG.LIMITS.MAX_TAGS, { 
      message: `Maximum ${APP_CONFIG.LIMITS.MAX_TAGS} tags allowed` 
    })
    .optional(),
  
  notes: z
    .string()
    .trim()
    .max(APP_CONFIG.LIMITS.MAX_DESCRIPTION_LENGTH, { 
      message: `Notes must be less than ${APP_CONFIG.LIMITS.MAX_DESCRIPTION_LENGTH} characters` 
    })
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
