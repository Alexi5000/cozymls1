# CozyMLS v1.0-fsd Deployment Documentation

## 🚀 Deployment Status

**Version:** v1.0-fsd  
**Deployment Date:** July 14, 2025  
**Status:** ✅ Successfully Deployed to Staging

## 🌐 Application URLs

| Service | URL | Status |
|---------|-----|--------|
| **Main Application** | http://localhost:3007 | ✅ Running |
| **Mirror Application** | http://localhost:8007 | ✅ Running |
| **Health Check (Main)** | http://localhost:3007/health | ✅ Healthy |
| **Health Check (Mirror)** | http://localhost:8007/health | ✅ Healthy |

## 🐳 Docker Containers

| Container | Image | Status | Ports |
|-----------|-------|--------|-------|
| cozymls-app-staging | cozymls1-cozymls-app | ✅ Running | 0.0.0.0:3007→80/tcp |
| cozymls-app-mirror-staging | cozymls1-cozymls-app-mirror | ✅ Running | 0.0.0.0:8007→80/tcp |
| cozymls-log-monitor | busybox:latest | ✅ Running | - |

## 📊 Monitoring & Logs

### Health Monitoring
- **Automatic Health Checks:** Every 30 seconds
- **Health Endpoint:** `/health`
- **Expected Response:** `200 OK` with body `healthy`

### Log Monitoring
- **Application Logs:** `docker logs cozymls-app-staging`
- **Mirror Logs:** `docker logs cozymls-app-mirror-staging`
- **Combined Logs:** `docker logs cozymls-log-monitor`
- **Log Files:** `./logs/` and `./logs-mirror/`

### Monitoring Commands
```bash
# Check container status
docker ps --filter "label=com.docker.compose.project=cozymls"

# View logs
docker-compose logs -f

# Check health
curl http://localhost:3007/health
curl http://localhost:8007/health

# PowerShell health check
Invoke-WebRequest -Uri "http://localhost:3007/health" -UseBasicParsing
Invoke-WebRequest -Uri "http://localhost:8007/health" -UseBasicParsing
```

## 🔧 Management Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Rebuild and Deploy
```bash
docker-compose build
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Using PowerShell Script
```powershell
# Deploy
.\deploy-staging.ps1

# Check status
.\deploy-staging.ps1 -Status

# View logs
.\deploy-staging.ps1 -Logs

# Stop containers
.\deploy-staging.ps1 -Stop

# Clean everything
.\deploy-staging.ps1 -Clean
```

## 📋 One-Week Monitoring Checklist

### Daily Tasks
- [ ] Check container health status
- [ ] Review application logs for errors
- [ ] Verify both URLs are accessible
- [ ] Monitor resource usage
- [ ] Check Nginx access logs

### Weekly Tasks
- [ ] Review aggregated logs
- [ ] Check for security issues
- [ ] Verify performance metrics
- [ ] Test failover between ports
- [ ] Document any issues found

### Key Metrics to Monitor
- **Response Time:** < 2 seconds for main pages
- **Error Rate:** < 1% of requests
- **Uptime:** > 99.9%
- **Memory Usage:** < 512MB per container
- **CPU Usage:** < 50% average

## 🚨 Troubleshooting

### Common Issues

**Container Won't Start:**
```bash
docker logs cozymls-app-staging
docker-compose down
docker-compose build
docker-compose up -d
```

**Port Already in Use:**
```bash
# Check what's using the port
netstat -ano | findstr :3007
netstat -ano | findstr :8007

# Stop conflicting services
docker-compose down
```

**Application Not Loading:**
- Check if containers are running: `docker ps`
- Check health endpoints: `curl http://localhost:3007/health`
- Review nginx logs: `docker logs cozymls-app-staging`

## 🎯 Success Criteria for Phase 1

- [x] Application successfully deployed to staging
- [x] Both port 3007 and 8007 accessible
- [x] Health checks passing
- [x] Containers running stably
- [x] Monitoring and logging in place
- [ ] **One week of stable operation** (In Progress)
- [ ] No critical errors in logs
- [ ] Performance within acceptable limits

## 📈 Next Steps

After successful one-week monitoring period:
1. **Production Deployment:** Deploy to production environment
2. **Monitoring Enhancement:** Implement Sentry integration
3. **Performance Optimization:** Based on monitoring data
4. **Security Hardening:** SSL/TLS certificates and security headers
5. **Backup Strategy:** Implement automated backups
6. **CI/CD Pipeline:** Automated deployment pipeline

## 🛠️ Technical Details

### Architecture
- **Frontend:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Framework:** Tailwind CSS + shadcn/ui
- **Architecture:** Feature-Sliced Design (FSD)
- **Container:** nginx:alpine
- **Ports:** 3007 (main), 8007 (mirror)

### Security Features
- CORS headers configured
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Content Security Policy
- Rate limiting
- Non-root user execution

### Performance Optimizations
- Gzip compression enabled
- Static asset caching (1 year)
- Bundle splitting and lazy loading
- Minified production builds

---

**Deployment completed successfully!** 🎉

For any issues or questions, check the troubleshooting section or review the container logs.
