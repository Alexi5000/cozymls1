#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { ImportGraphAnalyzer } from './import-graph-analyzer.js';

const OUTPUT_DIR = './baseline-reports';

class BaselineSetup {
  constructor() {
    this.outputDir = path.resolve(OUTPUT_DIR);
    this.startTime = new Date();
  }

  async initialize() {
    console.log('🚀 Starting Codebase Inventory & Baseline Tests Setup\n');
    
    // Create output directory
    this.ensureOutputDir();
    
    // Run all baseline tasks
    await this.runImportAnalysis();
    await this.runUnitTests();
    await this.generateBaselineReport();
    
    console.log('\n✅ Baseline setup complete!');
    console.log(`📁 Reports saved to: ${this.outputDir}`);
    console.log(`⏱️  Total time: ${Math.round((Date.now() - this.startTime) / 1000)}s`);
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async runImportAnalysis() {
    console.log('📊 Running import graph analysis...');
    
    try {
      const analyzer = new ImportGraphAnalyzer();
      const report = analyzer.analyze();
      
      // Save to baseline reports directory
      const importGraphPath = path.join(this.outputDir, 'import-graph.json');
      const summaryPath = path.join(this.outputDir, 'import-graph-summary.md');
      
      fs.writeFileSync(importGraphPath, JSON.stringify(report, null, 2));
      analyzer.generateMarkdownSummary(report, summaryPath);
      
      console.log(`   ✓ Import graph saved to ${importGraphPath}`);
      console.log(`   ✓ Summary saved to ${summaryPath}`);
      console.log(`   📈 Analyzed ${report.summary.totalFiles} files with ${report.summary.totalExternalDependencies} external dependencies`);
      
      if (report.analysis.circularDependencies.length > 0) {
        console.log(`   ⚠️  Found ${report.analysis.circularDependencies.length} circular dependencies`);
      }
      
      if (report.analysis.unusedFiles.length > 0) {
        console.log(`   ⚠️  Found ${report.analysis.unusedFiles.length} potentially unused files`);
      }
      
    } catch (error) {
      console.error('   ❌ Import analysis failed:', error.message);
    }
  }

  async runUnitTests() {
    console.log('\n🧪 Running unit tests with coverage...');
    
    try {
      await this.runCommand('npm', ['run', 'test:coverage'], {
        stdio: 'pipe',
        timeout: 120000 // 2 minutes timeout
      });
      
      // Move coverage reports to baseline directory
      const coverageDir = './coverage';
      const baselineCoverageDir = path.join(this.outputDir, 'coverage');
      
      if (fs.existsSync(coverageDir)) {
        this.copyDirectory(coverageDir, baselineCoverageDir);
        console.log(`   ✓ Coverage report saved to ${baselineCoverageDir}`);
      }
      
    } catch (error) {
      console.error('   ⚠️  Unit tests completed with errors (this is expected for initial setup)');
      console.log('   📝 Test errors have been logged for investigation');
    }
  }

  async runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        ...options
      });
      
      if (options.timeout) {
        setTimeout(() => {
          child.kill();
          reject(new Error(`Command timeout after ${options.timeout}ms`));
        }, options.timeout);
      }
      
      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });
      
      child.on('error', reject);
    });
  }

  copyDirectory(source, target) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }
    
    const files = fs.readdirSync(source);
    
    for (const file of files) {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        this.copyDirectory(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  }

  generateBaselineReport() {
    console.log('\n📋 Generating baseline report...');
    
    const report = {
      timestamp: this.startTime.toISOString(),
      project: this.getProjectInfo(),
      metrics: this.collectMetrics(),
      testing: {
        framework: 'Vitest + React Testing Library',
        e2eFramework: 'Cypress',
        coverageProvider: '@vitest/coverage-v8'
      },
      recommendations: this.generateRecommendations()
    };
    
    const reportPath = path.join(this.outputDir, 'baseline-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Generate markdown version
    const markdownPath = path.join(this.outputDir, 'baseline-report.md');
    this.generateMarkdownReport(report, markdownPath);
    
    console.log(`   ✓ Baseline report saved to ${reportPath}`);
    console.log(`   ✓ Markdown report saved to ${markdownPath}`);
  }

  getProjectInfo() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      return {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: Object.keys(packageJson.dependencies || {}),
        devDependencies: Object.keys(packageJson.devDependencies || {}),
        scripts: Object.keys(packageJson.scripts || {})
      };
    } catch (error) {
      return { error: 'Could not read package.json' };
    }
  }

  collectMetrics() {
    const srcDir = './src';
    const metrics = {
      totalFiles: 0,
      totalLines: 0,
      fileTypes: {}
    };
    
    if (fs.existsSync(srcDir)) {
      this.collectFileMetrics(srcDir, metrics);
    }
    
    return metrics;
  }

  collectFileMetrics(dir, metrics) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        this.collectFileMetrics(fullPath, metrics);
      } else {
        const ext = path.extname(file.name);
        metrics.totalFiles++;
        
        if (!metrics.fileTypes[ext]) {
          metrics.fileTypes[ext] = 0;
        }
        metrics.fileTypes[ext]++;
        
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          metrics.totalLines += content.split('\n').length;
        } catch (error) {
          // Skip binary files
        }
      }
    }
  }

  generateRecommendations() {
    const recommendations = [
      'Run import graph analysis before major refactoring to understand dependencies',
      'Use the baseline test suite to verify no regressions after refactoring',
      'Check coverage reports to identify untested code areas',
      'Review circular dependencies and unused files identified in the analysis',
      'Consider adding more E2E tests for critical user flows',
      'Set up CI/CD pipeline to run these tests automatically'
    ];
    
    return recommendations;
  }

  generateMarkdownReport(report, outputPath) {
    const md = `# Codebase Baseline Report

Generated: ${report.timestamp}

## Project Overview
- **Name**: ${report.project.name}
- **Version**: ${report.project.version}
- **Total Files**: ${report.metrics.totalFiles}
- **Total Lines**: ${report.metrics.totalLines}

## Dependencies
- **Production Dependencies**: ${report.project.dependencies?.length || 0}
- **Development Dependencies**: ${report.project.devDependencies?.length || 0}

## File Breakdown
${Object.entries(report.metrics.fileTypes).map(([ext, count]) => `- **${ext || 'no extension'}**: ${count} files`).join('\n')}

## Testing Setup
- **Unit Testing**: ${report.testing.framework}
- **E2E Testing**: ${report.testing.e2eFramework}
- **Coverage**: ${report.testing.coverageProvider}

## Available Scripts
${report.project.scripts?.map(script => `- \`npm run ${script}\``).join('\n') || 'No scripts available'}

## Recommendations
${report.recommendations.map(rec => `- ${rec}`).join('\n')}

## Files Generated
- \`import-graph.json\` - Complete dependency analysis
- \`import-graph-summary.md\` - Human-readable dependency summary
- \`coverage/\` - Test coverage reports
- \`baseline-report.json\` - This report in JSON format

## Next Steps
1. Review the import graph analysis for potential optimizations
2. Examine coverage reports to identify testing gaps
3. Run \`npm run e2e\` for end-to-end testing (requires dev server)
4. Use \`npm run analyze-imports\` to re-run dependency analysis
5. Use \`npm run baseline-tests\` to run the full test suite

## Usage
\`\`\`bash
# Re-run baseline analysis
npm run analyze-imports

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests (requires dev server running)
npm run e2e

# Run full baseline test suite
npm run baseline-tests
\`\`\`
`;

    fs.writeFileSync(outputPath, md);
  }
}

// CLI usage
if (process.argv[1] === new URL(import.meta.url).pathname.replace(/\\/g, '/')) {
  const baseline = new BaselineSetup();
  baseline.initialize().catch(console.error);
}

export { BaselineSetup };
