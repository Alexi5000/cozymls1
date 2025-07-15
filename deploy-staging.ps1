# CozyMLS v1.0-fsd Staging Deployment Script
# This script builds and deploys the application to Docker containers on ports 3007 and 8007

param(
    [switch]$Force = $false,
    [switch]$Rebuild = $false,
    [switch]$Logs = $false,
    [switch]$Status = $false,
    [switch]$Stop = $false,
    [switch]$Clean = $false
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# Configuration
$PROJECT_NAME = "cozymls"
$VERSION = "v1.0-fsd"
$BUILD_TIME = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")

Write-Host "🚀 CozyMLS $VERSION Staging Deployment" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Gray

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
}
catch {
    Write-Host "❌ Docker is not running or not installed" -ForegroundColor Red
    exit 1
}

# Handle different actions
if ($Status) {
    Write-Host "📊 Checking deployment status..." -ForegroundColor Yellow
    docker ps --filter "label=com.docker.compose.project=$PROJECT_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    Write-Host "`n🔍 Health status:"
    docker ps --filter "label=com.docker.compose.project=$PROJECT_NAME" --format "{{.Names}}" | ForEach-Object {
        $health = docker inspect $_ --format '{{.State.Health.Status}}' 2>$null
        if ($health) {
            Write-Host "  $_ : $health"
        } else {
            Write-Host "  $_ : No health check"
        }
    }
    exit 0
}

if ($Logs) {
    Write-Host "📋 Showing application logs..." -ForegroundColor Yellow
    docker-compose logs -f
    exit 0
}

if ($Stop) {
    Write-Host "🛑 Stopping containers..." -ForegroundColor Yellow
    docker-compose down
    Write-Host "✅ Containers stopped" -ForegroundColor Green
    exit 0
}

if ($Clean) {
    Write-Host "🧹 Cleaning up..." -ForegroundColor Yellow
    docker-compose down -v --rmi all
    docker system prune -f
    Write-Host "✅ Cleanup completed" -ForegroundColor Green
    exit 0
}

# Create logs directory
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" -Force | Out-Null
}
if (!(Test-Path "logs-mirror")) {
    New-Item -ItemType Directory -Path "logs-mirror" -Force | Out-Null
}

# Stop existing containers if Force is specified
if ($Force) {
    Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
    docker-compose down 2>$null
}

# Build and deploy
try {
    Write-Host "📦 Building application..." -ForegroundColor Yellow
    
    if ($Rebuild) {
        Write-Host "🔄 Rebuilding from scratch..." -ForegroundColor Yellow
        docker-compose build --no-cache
    } else {
        docker-compose build
    }
    
    Write-Host "🚀 Starting containers..." -ForegroundColor Yellow
    $env:BUILD_TIME = $BUILD_TIME
    docker-compose up -d
    
    Write-Host "⏳ Waiting for containers to be healthy..." -ForegroundColor Yellow
    $timeout = 60
    $elapsed = 0
    
    do {
        Start-Sleep -Seconds 5
        $elapsed += 5
        
        $app_health = docker inspect cozymls-app-staging --format '{{.State.Health.Status}}' 2>$null
        $mirror_health = docker inspect cozymls-app-mirror-staging --format '{{.State.Health.Status}}' 2>$null
        
        if ($app_health -eq "healthy" -and $mirror_health -eq "healthy") {
            break
        }
        
        Write-Host "  Waiting... ($elapsed/$timeout seconds)" -ForegroundColor Gray
    } while ($elapsed -lt $timeout)
    
    # Final status check
    Write-Host "`n📊 Deployment Status:" -ForegroundColor Green
    docker ps --filter "label=com.docker.compose.project=$PROJECT_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    # Health check
    Write-Host "`n🔍 Health Checks:" -ForegroundColor Green
    
    try {
        $response1 = Invoke-WebRequest -Uri "http://localhost:3007/health" -UseBasicParsing -TimeoutSec 5
        if ($response1.StatusCode -eq 200) {
            Write-Host "  ✅ Port 3007: healthy" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "  ❌ Port 3007: not responding" -ForegroundColor Red
    }
    
    try {
        $response2 = Invoke-WebRequest -Uri "http://localhost:8007/health" -UseBasicParsing -TimeoutSec 5
        if ($response2.StatusCode -eq 200) {
            Write-Host "  ✅ Port 8007: healthy" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "  ❌ Port 8007: not responding" -ForegroundColor Red
    }
    
    Write-Host "`n🎉 Deployment Complete!" -ForegroundColor Green
    Write-Host "🌐 Application URLs:" -ForegroundColor Cyan
    Write-Host "   Main: http://localhost:3007" -ForegroundColor White
    Write-Host "   Mirror: http://localhost:8007" -ForegroundColor White
    Write-Host "   Health: http://localhost:3007/health" -ForegroundColor White
    
    Write-Host "`n📋 Useful Commands:" -ForegroundColor Cyan
    Write-Host "   View logs: .\deploy-staging.ps1 -Logs" -ForegroundColor White
    Write-Host "   Check status: .\deploy-staging.ps1 -Status" -ForegroundColor White
    Write-Host "   Stop containers: .\deploy-staging.ps1 -Stop" -ForegroundColor White
    Write-Host "   Clean everything: .\deploy-staging.ps1 -Clean" -ForegroundColor White
}
catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    Write-Host "📋 Container logs:" -ForegroundColor Yellow
    docker-compose logs --tail=50
    exit 1
}
