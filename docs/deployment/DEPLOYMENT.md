# Deployment Guide

## Lovable Platform Deployment (Recommended)

### Quick Deploy

1. Click **Publish** button in Lovable editor
2. Your app is automatically deployed to: `https://cozymls1.lovable.app`
3. HTTPS is automatically configured

### Custom Domain

1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

**Note**: Custom domains require a paid Lovable plan.

## Self-Hosting

### Build Production Bundle

```bash
npm run build
```

Output: `dist/` folder

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Environment Variables

Configure in hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Related Documentation

- [CI/CD Guide](CICD.md)
- [Architecture](../architecture/ARCHITECTURE.md)
