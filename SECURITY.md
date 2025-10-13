# Security Policy

## Supported Versions

Currently supported versions of Haven Estate Suite:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in Haven Estate Suite, please report it responsibly.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security issues by emailing: **security@havenestate.com** (or your designated security contact)

Include the following information:

- Type of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information

### What to Expect

1. **Acknowledgment**: We'll acknowledge receipt within 48 hours
2. **Investigation**: We'll investigate and validate the issue
3. **Communication**: We'll keep you informed of our progress
4. **Resolution**: We'll work on a fix and coordinate disclosure
5. **Credit**: With your permission, we'll credit you in the security advisory

### Security Best Practices

#### For Contributors

- Never commit sensitive data (API keys, passwords, tokens)
- Use environment variables for secrets
- Review code for security vulnerabilities before submitting PRs
- Follow secure coding practices
- Keep dependencies up to date

#### For Deployments

##### Environment Variables

Never expose these in client-side code:
- Database credentials
- API secret keys
- Authentication secrets
- Third-party service credentials

Use Lovable Cloud's secure secret management for sensitive data.

##### Row Level Security (RLS)

- **Always enable RLS** on database tables containing user data
- Implement proper RLS policies for all tables
- Test RLS policies thoroughly
- Review policies during code review

Example RLS policy:
```sql
-- Users can only view their own data
CREATE POLICY "Users can view own data"
ON public.user_data
FOR SELECT
USING (auth.uid() = user_id);
```

##### Authentication

- Use secure password hashing (handled by Lovable Cloud/Supabase)
- Implement proper session management
- Enable email confirmation for new signups
- Use secure password reset flows
- Implement rate limiting on auth endpoints

##### Data Validation

- Validate all user input on both client and server
- Sanitize data before database operations
- Use parameterized queries (handled by Supabase client)
- Implement proper error handling without exposing sensitive info

##### CORS Configuration

- Configure CORS properly in edge functions
- Only allow trusted origins in production
- Use specific origins instead of wildcards

##### File Upload Security

- Validate file types and sizes
- Scan uploaded files for malware
- Use secure storage bucket policies
- Implement proper access controls

Example storage policy:
```sql
-- Users can only access their own files
CREATE POLICY "Users access own files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'user-uploads' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

##### Dependency Management

- Regularly update dependencies
- Review security advisories
- Use `npm audit` to check for vulnerabilities
- Monitor automated security alerts

##### Code Review Checklist

When reviewing code, check for:

- [ ] No hardcoded secrets or credentials
- [ ] Proper input validation
- [ ] RLS policies on new tables
- [ ] Authentication checks on protected routes
- [ ] Proper error handling
- [ ] No SQL injection vulnerabilities
- [ ] XSS prevention measures
- [ ] CSRF protection where needed
- [ ] Secure file upload handling
- [ ] Proper access control checks

### Common Security Issues

#### SQL Injection Prevention

✅ **SAFE** - Using Supabase client (parameterized queries):
```typescript
const { data } = await supabase
  .from('properties')
  .select()
  .eq('id', propertyId);
```

❌ **UNSAFE** - String concatenation:
```typescript
// Never do this!
await supabase.rpc('raw_query', {
  query: `SELECT * FROM properties WHERE id = '${propertyId}'`
});
```

#### XSS Prevention

✅ **SAFE** - React automatically escapes:
```tsx
<div>{userInput}</div>
```

❌ **UNSAFE** - dangerouslySetInnerHTML:
```tsx
// Avoid unless absolutely necessary and sanitized
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

#### Authentication Bypass

✅ **SAFE** - Protected routes:
```typescript
// Use protected route wrapper
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

❌ **UNSAFE** - Client-side only checks:
```typescript
// Not enough - backend must verify too
if (user) {
  return <DashboardPage />;
}
```

### Security Tools

We use the following automated security tools:

- **GitHub Dependabot**: Dependency vulnerability scanning
- **npm audit**: Package vulnerability checking
- **ESLint security plugins**: Code security linting
- **Supabase RLS**: Database-level security

### Security Updates

Security updates will be:

1. Developed in private
2. Tested thoroughly
3. Released as patch versions
4. Documented in CHANGELOG.md
5. Announced to users

### Disclosure Policy

- We aim to patch critical vulnerabilities within 7 days
- We'll publish security advisories after fixes are deployed
- We'll credit researchers (with permission)
- We follow coordinated disclosure practices

## Additional Resources

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/learn/security)

## Questions?

For security-related questions that aren't vulnerabilities, please use the [question template](.github/ISSUE_TEMPLATE/question.md).

---

Thank you for helping keep Haven Estate Suite secure! 🔒
