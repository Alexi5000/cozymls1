import { describe, it, expect } from 'vitest';
import { profileSchema, passwordSchema } from './validation';

describe('profileSchema', () => {
  it('validates a valid profile', () => {
    const validProfile = {
      name: 'John Doe',
      phone: '+353 1 234 5678',
      department: 'Sales',
    };

    const result = profileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('rejects name shorter than 2 characters', () => {
    const invalidProfile = {
      name: 'J',
      phone: '+353 1 234 5678',
    };

    const result = profileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });

  it('rejects name longer than 100 characters', () => {
    const invalidProfile = {
      name: 'a'.repeat(101),
      phone: '+353 1 234 5678',
    };

    const result = profileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });

  it('accepts optional phone', () => {
    const validProfile = {
      name: 'John Doe',
      phone: '',
    };

    const result = profileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });
});

describe('passwordSchema', () => {
  it('validates a valid password change', () => {
    const validPassword = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass123!',
      confirmPassword: 'NewPass123!',
    };

    const result = passwordSchema.safeParse(validPassword);
    expect(result.success).toBe(true);
  });

  it('rejects password shorter than 8 characters', () => {
    const invalidPassword = {
      currentPassword: 'Short1!',
      newPassword: 'Short1!',
      confirmPassword: 'Short1!',
    };

    const result = passwordSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
  });

  it('rejects password without uppercase letter', () => {
    const invalidPassword = {
      currentPassword: 'OldPass123!',
      newPassword: 'newpass123!',
      confirmPassword: 'newpass123!',
    };

    const result = passwordSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
  });

  it('rejects password without lowercase letter', () => {
    const invalidPassword = {
      currentPassword: 'OldPass123!',
      newPassword: 'NEWPASS123!',
      confirmPassword: 'NEWPASS123!',
    };

    const result = passwordSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
  });

  it('rejects password without number', () => {
    const invalidPassword = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPassword!',
      confirmPassword: 'NewPassword!',
    };

    const result = passwordSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
  });

  it('rejects password without special character', () => {
    const invalidPassword = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass123',
      confirmPassword: 'NewPass123',
    };

    const result = passwordSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
  });

  it('rejects mismatched passwords', () => {
    const invalidPassword = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass123!',
      confirmPassword: 'DifferentPass123!',
    };

    const result = passwordSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('confirmPassword');
    }
  });
});
