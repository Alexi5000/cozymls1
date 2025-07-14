#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to find all TypeScript files recursively
function findTsFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      files.push(...findTsFiles(fullPath));
    } else if (item.name.endsWith('.ts') || item.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Find all TypeScript files in src directory
const srcDir = path.join(__dirname, '..', 'src');
const tsFiles = findTsFiles(srcDir);

console.log(`Found ${tsFiles.length} TypeScript files`);

// Run the transform on batches of files
const batchSize = 10;
const batches = [];

for (let i = 0; i < tsFiles.length; i += batchSize) {
  batches.push(tsFiles.slice(i, i + batchSize));
}

console.log(`Running transform in ${batches.length} batches...`);

let processedCount = 0;

async function processBatch(batch, index) {
  return new Promise((resolve, reject) => {
    const fileList = batch.map(f => `"${f}"`).join(' ');
    const command = `npx jscodeshift -t scripts/path-aliases-transform.js ${fileList} --parser=tsx`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error in batch ${index + 1}:`, error);
        reject(error);
      } else {
        processedCount += batch.length;
        console.log(`Batch ${index + 1}/${batches.length} completed (${processedCount}/${tsFiles.length} files)`);
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function runTransform() {
  for (let i = 0; i < batches.length; i++) {
    try {
      await processBatch(batches[i], i);
    } catch (error) {
      console.error(`Failed to process batch ${i + 1}`);
    }
  }
  
  console.log('Transform completed!');
}

runTransform().catch(console.error);
