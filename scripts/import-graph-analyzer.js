#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImportGraphAnalyzer {
  constructor(srcDir = './src') {
    this.srcDir = path.resolve(srcDir);
    this.importGraph = new Map();
    this.allFiles = new Set();
    this.externalDependencies = new Set();
  }

  // Get all TypeScript/JavaScript files in the src directory
  getAllFiles(dir = this.srcDir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        files.push(...this.getAllFiles(fullPath));
      } else if (this.isSourceFile(item.name)) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  isSourceFile(filename) {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    return extensions.some(ext => filename.endsWith(ext));
  }

  // Parse import statements from file content
  parseImports(content, filePath) {
    const imports = [];
    const importRegex = /import\s+(?:(?:[\w\s{},*]+)\s+from\s+)?['"]([^'"]+)['"]/g;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      imports.push(this.resolveImport(importPath, filePath));
    }
    
    // Also check for dynamic imports
    const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      const importPath = match[1];
      imports.push(this.resolveImport(importPath, filePath));
    }
    
    return imports;
  }

  resolveImport(importPath, fromFile) {
    // Check if it's a relative import
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const resolvedPath = path.resolve(path.dirname(fromFile), importPath);
      
      // Try different extensions
      const extensions = ['.ts', '.tsx', '.js', '.jsx'];
      for (const ext of extensions) {
        const withExt = resolvedPath + ext;
        if (fs.existsSync(withExt)) {
          return {
            type: 'internal',
            path: withExt,
            original: importPath
          };
        }
      }
      
      // Check for index files
      const indexPath = path.join(resolvedPath, 'index');
      for (const ext of extensions) {
        const withExt = indexPath + ext;
        if (fs.existsSync(withExt)) {
          return {
            type: 'internal',
            path: withExt,
            original: importPath
          };
        }
      }
      
      return {
        type: 'internal',
        path: resolvedPath,
        original: importPath,
        missing: true
      };
    }
    
    // Check if it's an absolute import within src
    if (importPath.startsWith('src/') || importPath.startsWith('@/')) {
      const cleanPath = importPath.replace(/^(@\/|src\/)/, '');
      const resolvedPath = path.resolve(this.srcDir, cleanPath);
      
      const extensions = ['.ts', '.tsx', '.js', '.jsx'];
      for (const ext of extensions) {
        const withExt = resolvedPath + ext;
        if (fs.existsSync(withExt)) {
          return {
            type: 'internal',
            path: withExt,
            original: importPath
          };
        }
      }
      
      const indexPath = path.join(resolvedPath, 'index');
      for (const ext of extensions) {
        const withExt = indexPath + ext;
        if (fs.existsSync(withExt)) {
          return {
            type: 'internal',
            path: withExt,
            original: importPath
          };
        }
      }
      
      return {
        type: 'internal',
        path: resolvedPath,
        original: importPath,
        missing: true
      };
    }
    
    // External dependency
    this.externalDependencies.add(importPath);
    return {
      type: 'external',
      path: importPath,
      original: importPath
    };
  }

  // Get relative path for cleaner output
  getRelativePath(filePath) {
    return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  }

  // Analyze all files and build import graph
  analyze() {
    console.log('🔍 Analyzing import graph...');
    
    const allFiles = this.getAllFiles();
    console.log(`📁 Found ${allFiles.length} source files`);
    
    // Initialize graph for all files
    for (const file of allFiles) {
      this.allFiles.add(file);
      this.importGraph.set(file, {
        imports: [],
        importedBy: [],
        exports: []
      });
    }
    
    // Parse imports for each file
    for (const file of allFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const imports = this.parseImports(content, file);
        const exports = this.parseExports(content);
        
        const fileData = this.importGraph.get(file);
        fileData.imports = imports;
        fileData.exports = exports;
        
        // Update importedBy for internal imports
        for (const imp of imports) {
          if (imp.type === 'internal' && !imp.missing && this.importGraph.has(imp.path)) {
            const targetData = this.importGraph.get(imp.path);
            if (!targetData.importedBy.includes(file)) {
              targetData.importedBy.push(file);
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️  Error analyzing ${file}: ${error.message}`);
      }
    }
    
    return this.generateReport();
  }

  parseExports(content) {
    const exports = [];
    
    // Named exports
    const namedExportRegex = /export\s+(?:const|let|var|function|class|interface|type|enum)\s+(\w+)/g;
    let match;
    while ((match = namedExportRegex.exec(content)) !== null) {
      exports.push({ name: match[1], type: 'named' });
    }
    
    // Export statements
    const exportStatementRegex = /export\s+\{([^}]+)\}/g;
    while ((match = exportStatementRegex.exec(content)) !== null) {
      const exportList = match[1].split(',').map(e => e.trim().split(' as ')[0].trim());
      exports.push(...exportList.map(name => ({ name, type: 'named' })));
    }
    
    // Default export
    if (content.includes('export default')) {
      exports.push({ name: 'default', type: 'default' });
    }
    
    return exports;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.allFiles.size,
        totalExternalDependencies: this.externalDependencies.size,
        totalImports: Array.from(this.importGraph.values()).reduce((sum, data) => sum + data.imports.length, 0)
      },
      externalDependencies: Array.from(this.externalDependencies).sort(),
      fileGraph: {},
      analysis: {
        circularDependencies: [],
        unusedFiles: [],
        missingImports: [],
        heavilyImportedFiles: []
      }
    };
    
    // Build file graph
    for (const [file, data] of this.importGraph) {
      const relativePath = this.getRelativePath(file);
      report.fileGraph[relativePath] = {
        imports: data.imports.map(imp => ({
          path: imp.type === 'internal' ? this.getRelativePath(imp.path) : imp.path,
          type: imp.type,
          original: imp.original,
          missing: imp.missing || false
        })),
        importedBy: data.importedBy.map(f => this.getRelativePath(f)),
        exports: data.exports
      };
    }
    
    // Find circular dependencies
    this.findCircularDependencies(report);
    
    // Find unused files
    this.findUnusedFiles(report);
    
    // Find missing imports
    this.findMissingImports(report);
    
    // Find heavily imported files
    this.findHeavilyImportedFiles(report);
    
    return report;
  }

  findCircularDependencies(report) {
    const visited = new Set();
    const recursionStack = new Set();
    const cycles = [];
    
    const dfs = (file, path = []) => {
      if (recursionStack.has(file)) {
        const cycleStart = path.indexOf(file);
        if (cycleStart !== -1) {
          cycles.push([...path.slice(cycleStart), file]);
        }
        return;
      }
      
      if (visited.has(file)) return;
      
      visited.add(file);
      recursionStack.add(file);
      path.push(file);
      
      const data = this.importGraph.get(file);
      if (data) {
        for (const imp of data.imports) {
          if (imp.type === 'internal' && !imp.missing && this.importGraph.has(imp.path)) {
            dfs(imp.path, [...path]);
          }
        }
      }
      
      recursionStack.delete(file);
      path.pop();
    };
    
    for (const file of this.allFiles) {
      if (!visited.has(file)) {
        dfs(file);
      }
    }
    
    report.analysis.circularDependencies = cycles.map(cycle => 
      cycle.map(f => this.getRelativePath(f))
    );
  }

  findUnusedFiles(report) {
    const unused = [];
    
    for (const [file, data] of this.importGraph) {
      // A file is potentially unused if it's not imported by any other file
      // and it's not an entry point (main.tsx, App.tsx, etc.)
      const relativePath = this.getRelativePath(file);
      const isEntryPoint = /\/(main|App|index)\.(tsx?|jsx?)$/.test(relativePath);
      
      if (data.importedBy.length === 0 && !isEntryPoint) {
        unused.push(relativePath);
      }
    }
    
    report.analysis.unusedFiles = unused;
  }

  findMissingImports(report) {
    const missing = [];
    
    for (const [file, data] of this.importGraph) {
      for (const imp of data.imports) {
        if (imp.missing) {
          missing.push({
            file: this.getRelativePath(file),
            import: imp.original,
            resolvedPath: this.getRelativePath(imp.path)
          });
        }
      }
    }
    
    report.analysis.missingImports = missing;
  }

  findHeavilyImportedFiles(report) {
    const importCounts = [];
    
    for (const [file, data] of this.importGraph) {
      importCounts.push({
        file: this.getRelativePath(file),
        importedBy: data.importedBy.length,
        imports: data.imports.length
      });
    }
    
    // Sort by most imported
    importCounts.sort((a, b) => b.importedBy - a.importedBy);
    
    report.analysis.heavilyImportedFiles = importCounts.slice(0, 10);
  }

  saveReport(report, filename = 'import-graph.json') {
    const outputPath = path.join(process.cwd(), filename);
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`📊 Import graph saved to ${outputPath}`);
    
    // Also save a summary
    const summaryPath = path.join(process.cwd(), 'import-graph-summary.md');
    this.generateMarkdownSummary(report, summaryPath);
  }

  generateMarkdownSummary(report, outputPath) {
    const md = `# Import Graph Analysis Report

Generated: ${report.timestamp}

## Summary
- **Total Files**: ${report.summary.totalFiles}
- **Total External Dependencies**: ${report.summary.totalExternalDependencies}
- **Total Imports**: ${report.summary.totalImports}

## External Dependencies
${report.externalDependencies.map(dep => `- ${dep}`).join('\n')}

## Analysis Results

### Circular Dependencies
${report.analysis.circularDependencies.length === 0 ? 'No circular dependencies found! 🎉' : 
  report.analysis.circularDependencies.map(cycle => 
    `- ${cycle.join(' → ')}`
  ).join('\n')}

### Unused Files
${report.analysis.unusedFiles.length === 0 ? 'No unused files found! 🎉' : 
  report.analysis.unusedFiles.map(file => `- ${file}`).join('\n')}

### Missing Imports
${report.analysis.missingImports.length === 0 ? 'No missing imports found! 🎉' : 
  report.analysis.missingImports.map(item => 
    `- ${item.file}: ${item.import} (resolved to ${item.resolvedPath})`
  ).join('\n')}

### Most Imported Files
${report.analysis.heavilyImportedFiles.map(item => 
  `- ${item.file}: imported by ${item.importedBy} files`
).join('\n')}

## File Graph

${Object.entries(report.fileGraph).map(([file, data]) => `
### ${file}
- **Imports**: ${data.imports.length} files
- **Imported by**: ${data.importedBy.length} files
- **Exports**: ${data.exports.length} items

**Imports:**
${data.imports.map(imp => `  - ${imp.path} (${imp.type})`).join('\n')}

**Imported By:**
${data.importedBy.map(file => `  - ${file}`).join('\n')}

**Exports:**
${data.exports.map(exp => `  - ${exp.name} (${exp.type})`).join('\n')}
`).join('\n')}
`;

    fs.writeFileSync(outputPath, md);
    console.log(`📝 Summary saved to ${outputPath}`);
  }
}

// CLI usage
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const analyzer = new ImportGraphAnalyzer();
  const report = analyzer.analyze();
  analyzer.saveReport(report);
  
  console.log('\n📈 Analysis complete!');
  console.log(`   Files analyzed: ${report.summary.totalFiles}`);
  console.log(`   External dependencies: ${report.summary.totalExternalDependencies}`);
  console.log(`   Circular dependencies: ${report.analysis.circularDependencies.length}`);
  console.log(`   Unused files: ${report.analysis.unusedFiles.length}`);
  console.log(`   Missing imports: ${report.analysis.missingImports.length}`);
}

export { ImportGraphAnalyzer };
