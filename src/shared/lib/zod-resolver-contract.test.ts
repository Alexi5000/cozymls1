import { zodResolver } from '@hookform/resolvers/zod';
import { describe, expect, it } from 'vitest';
import { activityFormSchema } from '@/features/activities/lib/validation';
import { contactFormSchema } from '@/features/contacts/lib/validation';
import { dealFormSchema } from '@/features/deals/lib/validation';

// Guards the Zod 4 / @hookform/resolvers 5 upgrade: forms must still apply
// schema defaults, keep field messages, and reject malformed ids.
const options = { fields: {}, shouldUseNativeValidation: false } as const;
const uuid = '3f2504e0-4f89-41d3-9a0c-0305e82c3301';

describe('zodResolver contract', () => {
  it('applies schema defaults to resolved activity values', async () => {
    const result = await zodResolver(activityFormSchema)(
      { type: 'call', title: '  Follow up  ' },
      undefined,
      options,
    );
    expect(result.errors).toEqual({});
    expect(result.values).toMatchObject({ type: 'call', title: 'Follow up', priority: 'medium' });
  });

  it('keeps custom contact messages and default status', async () => {
    const bad = await zodResolver(contactFormSchema)(
      { name: '', email: 'not-an-email', phone: '555' },
      undefined,
      options,
    );
    expect(bad.errors.name?.message).toBe('Name is required');
    expect(bad.errors.email?.message).toBe('Invalid email address');

    const ok = await zodResolver(contactFormSchema)(
      { name: 'Ada', email: 'ada@example.com', phone: '555' },
      undefined,
      options,
    );
    expect(ok.values).toMatchObject({ status: 'lead' });
  });

  it('rejects malformed deal ids and accepts valid ones', async () => {
    const base = { title: 'Deal', value: 100, expected_close_date: '2026-12-01' };
    const bad = await zodResolver(dealFormSchema)({ ...base, contact_id: 'abc' }, undefined, options);
    expect(bad.errors.contact_id?.message).toBe('Invalid contact selected');

    const ok = await zodResolver(dealFormSchema)({ ...base, contact_id: uuid }, undefined, options);
    expect(ok.errors).toEqual({});
    expect(ok.values).toMatchObject({ stage: 'prospect', probability: 25, contact_id: uuid });
  });
});
