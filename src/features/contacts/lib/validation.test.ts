import { describe, it, expect } from 'vitest';
import { contactFormSchema } from './validation';

describe('contactFormSchema', () => {
  it('validates a valid contact', () => {
    const validContact = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+353 1 234 5678',
      company: 'Acme Corp',
      status: 'lead',
    };

    const result = contactFormSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const invalidContact = {
      name: '',
      email: 'john@example.com',
      phone: '+353 1 234 5678',
      status: 'lead',
    };

    const result = contactFormSchema.safeParse(invalidContact);
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const invalidContact = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '+353 1 234 5678',
      status: 'lead',
    };

    const result = contactFormSchema.safeParse(invalidContact);
    expect(result.success).toBe(false);
  });

  it('rejects name longer than 100 characters', () => {
    const invalidContact = {
      name: 'a'.repeat(101),
      email: 'john@example.com',
      phone: '+353 1 234 5678',
      status: 'lead',
    };

    const result = contactFormSchema.safeParse(invalidContact);
    expect(result.success).toBe(false);
  });

  it('rejects email longer than 255 characters', () => {
    const invalidContact = {
      name: 'John Doe',
      email: 'a'.repeat(246) + '@example.com', // 256 chars total
      phone: '+353 1 234 5678',
      status: 'lead',
    };

    const result = contactFormSchema.safeParse(invalidContact);
    expect(result.success).toBe(false);
  });

  it('trims whitespace from name and email', () => {
    const contactWithWhitespace = {
      name: '  John Doe  ',
      email: '  john@example.com  ',
      phone: '+353 1 234 5678',
      status: 'lead',
    };

    const result = contactFormSchema.safeParse(contactWithWhitespace);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('John Doe');
      expect(result.data.email).toBe('john@example.com');
    }
  });

  it('accepts optional fields as empty strings', () => {
    const validContact = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+353 1 234 5678',
      status: 'lead',
      company: '',
      tags: [],
      notes: '',
    };

    const result = contactFormSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it('rejects more than 10 tags', () => {
    const invalidContact = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+353 1 234 5678',
      status: 'lead',
      tags: Array(11).fill('tag'),
    };

    const result = contactFormSchema.safeParse(invalidContact);
    expect(result.success).toBe(false);
  });
});
