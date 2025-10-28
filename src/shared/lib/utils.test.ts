import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('text-sm', 'font-bold');
    expect(result).toBe('text-sm font-bold');
  });

  it('handles conditional classes', () => {
    const result = cn('text-sm', false && 'hidden', 'font-bold');
    expect(result).toBe('text-sm font-bold');
  });

  it('handles Tailwind class conflicts', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toBe('px-4');
  });

  it('handles undefined and null values', () => {
    const result = cn('text-sm', undefined, null, 'font-bold');
    expect(result).toBe('text-sm font-bold');
  });

  it('handles array of classes', () => {
    const result = cn(['text-sm', 'font-bold']);
    expect(result).toBe('text-sm font-bold');
  });
});
