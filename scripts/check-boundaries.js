#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🔍 Checking FSD layer boundaries...');

try {
  const output = execSync('npm run lint', { encoding: 'utf8' });
  
  // Check for boundaries violations in the output
  const boundariesViolations = output.split('\n').filter(line => 
    line.includes('boundaries/element-types') || 
    line.includes('boundaries/no-private')
  );
  
  if (boundariesViolations.length > 0) {
    console.log('\n❌ FSD Layer boundaries violated!');
    console.log('Violations found:');
    boundariesViolations.forEach(violation => {
      console.log(`  ${violation}`);
    });
    process.exit(1);
  } else {
    console.log('✅ All FSD layer boundaries are respected.');
  }
} catch (error) {
  // ESLint returns non-zero exit code when there are errors
  const output = error.stdout || error.stderr || '';
  
  const boundariesViolations = output.split('\n').filter(line => 
    line.includes('boundaries/element-types') || 
    line.includes('boundaries/no-private')
  );
  
  if (boundariesViolations.length > 0) {
    console.log('\n❌ FSD Layer boundaries violated!');
    console.log('Violations found:');
    boundariesViolations.forEach(violation => {
      console.log(`  ${violation}`);
    });
    process.exit(1);
  } else {
    console.log('✅ All FSD layer boundaries are respected.');
    console.log('Note: Other ESLint errors may exist, but no boundary violations found.');
  }
}
