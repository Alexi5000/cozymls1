/**
 * A jscodeshift codemod to rewrite relative import paths to use configured path aliases.
 */

const path = require('path');
const fs = require('fs');

/**
 * Path aliases based on the project configuration
 */
const ALIASES = {
  '@/app': './src/app',
  '@/pages': './src/pages',
  '@/widgets': './src/widgets',
  '@/features': './src/features',
  '@/entities': './src/entities',
  '@/shared': './src/shared',
  '@/processes': './src/processes',
  '@': './src'
};

/**
 * Resolves a relative path to an absolute path from the file's location
 */
function resolveRelativePath(filePath, importPath) {
  const fileDir = path.dirname(filePath);
  const resolvedPath = path.resolve(fileDir, importPath);
  return path.relative(process.cwd(), resolvedPath).replace(/\\/g, '/');
}

/**
 * Converts an absolute path to use an alias if possible
 */
function pathToAlias(absolutePath) {
  // Sort aliases by length (longest first) to match most specific paths first
  const sortedAliases = Object.entries(ALIASES).sort(([, a], [, b]) => b.length - a.length);
  
  for (const [alias, target] of sortedAliases) {
    const normalizedTarget = target.replace(/^\.\//, '');
    if (absolutePath.startsWith(normalizedTarget)) {
      return absolutePath.replace(normalizedTarget, alias);
    }
  }
  
  return null;
}

/**
 * Checks if a file exists (with common extensions)
 */
function fileExists(filePath) {
  const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
  
  for (const ext of extensions) {
    const fullPath = filePath + ext;
    if (fs.existsSync(fullPath)) {
      return true;
    }
  }
  
  return false;
}

module.exports = function(file, api) {
  const j = api.jscodeshift;
  
  // Configure parser for TypeScript and JSX
  const parser = {
    parser: require('recast/parsers/typescript'),
  };
  
  const root = j(file.source, parser);
  
  // Find all import declarations
  root.find(j.ImportDeclaration).forEach(path => {
    const importPath = path.node.source.value;
    
    // Only process relative imports
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      try {
        // Resolve the relative path to an absolute path
        const resolvedPath = resolveRelativePath(file.path, importPath);
        
        // Check if the resolved file exists
        if (fileExists(resolvedPath)) {
          // Try to convert to alias
          const aliasPath = pathToAlias(resolvedPath);
          
          if (aliasPath) {
            console.log(`Converting ${importPath} -> ${aliasPath} in ${file.path}`);
            path.node.source.value = aliasPath;
          }
        }
      } catch (error) {
        console.warn(`Failed to resolve path ${importPath} in ${file.path}: ${error.message}`);
      }
    }
  });
  
  return root.toSource();
};

// Configure the transform to use TypeScript parser
module.exports.parser = 'tsx';

