#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");

console.log("\n=======================================================");
console.log("🔍 AAUROSHE — Architectural Blast Radius & Complexity Audit");
console.log("=======================================================\n");

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".js") || file.endsWith(".jsx")) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const allSourceFiles = getAllFiles(srcDir);
const graph = new Map();

// Initialize graph
allSourceFiles.forEach((file) => {
  const relative = path.relative(rootDir, file).replace(/\\/g, "/");
  graph.set(relative, {
    file: relative,
    imports: [],
    importedBy: [],
    violations: [],
  });
});

// Extract imports
const importRegex = /import\s+(?:(?:{[^}]+})|(?:[\w*]+))\s+from\s+['"]([^'"]+)['"]/g;
const dynamicImportRegex = /import\(['"]([^'"]+)['"]\)/g;

allSourceFiles.forEach((filePath) => {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf-8");

  let match;
  const matchedImports = new Set();

  while ((match = importRegex.exec(content)) !== null) {
    matchedImports.add(match[1]);
  }
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    matchedImports.add(match[1]);
  }

  matchedImports.forEach((importPath) => {
    // Resolve alias '@/...'
    let resolvedRel = null;
    if (importPath.startsWith("@/")) {
      const aliasTarget = importPath.replace("@/", "src/");
      // Try extensions
      for (const ext of ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"]) {
        const check = path.join(rootDir, aliasTarget + ext).replace(/\\/g, "/");
        if (fs.existsSync(check) && !fs.statSync(check).isDirectory()) {
          resolvedRel = path.relative(rootDir, check).replace(/\\/g, "/");
          break;
        }
      }
    } else if (importPath.startsWith(".")) {
      const dir = path.dirname(filePath);
      for (const ext of ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"]) {
        const check = path.resolve(dir, importPath + ext);
        if (fs.existsSync(check) && !fs.statSync(check).isDirectory()) {
          resolvedRel = path.relative(rootDir, check).replace(/\\/g, "/");
          break;
        }
      }
    }

    if (resolvedRel && graph.has(resolvedRel)) {
      graph.get(relPath).imports.push(resolvedRel);
      graph.get(resolvedRel).importedBy.push(relPath);
    }
  });
});

// Rule 1: Boundary Checks
let violationsCount = 0;

graph.forEach((node, file) => {
  // Check Atoms boundary
  if (file.includes("/components/atoms/")) {
    node.imports.forEach((imp) => {
      if (
        imp.includes("/components/molecules/") ||
        imp.includes("/components/organisms/") ||
        imp.includes("/components/templates/") ||
        imp.includes("/app/")
      ) {
        node.violations.push(`Atomic Boundary Violation: Atom "${file}" imports higher-order component "${imp}"`);
        violationsCount++;
      }
    });
  }

  // Check Core/Pure Services boundary (Must not import React or UI components)
  if (file.includes("/services/cart/cartService.ts") || file.includes("/core/")) {
    node.imports.forEach((imp) => {
      if (imp.includes("/components/") || imp.includes("/app/")) {
        node.violations.push(`Domain Leak Violation: Pure domain module "${file}" imports UI layer "${imp}"`);
        violationsCount++;
      }
    });
  }
});

// Rule 2: Cycle Detection (Tarjan / DFS)
const cycles = [];
const visited = new Set();
const recursionStack = new Set();

function checkCycles(nodeKey, pathStack = []) {
  visited.add(nodeKey);
  recursionStack.add(nodeKey);
  pathStack.push(nodeKey);

  const node = graph.get(nodeKey);
  if (node) {
    for (const neighbor of node.imports) {
      if (!visited.has(neighbor)) {
        checkCycles(neighbor, [...pathStack]);
      } else if (recursionStack.has(neighbor)) {
        const cyclePath = [...pathStack, neighbor];
        cycles.push(cyclePath);
      }
    }
  }

  recursionStack.delete(nodeKey);
}

graph.forEach((_, key) => {
  if (!visited.has(key)) {
    checkCycles(key);
  }
});

// Report Results
console.log(`📁 Analyzed Source Files: ${graph.size}`);
console.log(`🔗 Architectural Dependency Edges: ${Array.from(graph.values()).reduce((acc, n) => acc + n.imports.length, 0)}`);
console.log(`🔄 Circular Dependency Cycles: ${cycles.length === 0 ? "0 (PASSED ✅)" : `${cycles.length} (FAILED ❌)`}`);
console.log(`⚠️ Boundary Violations: ${violationsCount === 0 ? "0 (PASSED ✅)" : `${violationsCount} (FAILED ❌)`}`);

console.log("\n-------------------------------------------------------");
console.log("📊 Blast Radius Complexity Top Ranking (Fan-In Analysis):");
console.log("-------------------------------------------------------");

const ranking = Array.from(graph.values())
  .sort((a, b) => b.importedBy.length - a.importedBy.length)
  .slice(0, 10);

ranking.forEach((r, idx) => {
  const blastLevel = r.importedBy.length > 10 ? "HIGH" : r.importedBy.length > 4 ? "MODERATE" : "LOW";
  console.log(
    `#${idx + 1} [${blastLevel.padEnd(8)}] Dependents: ${String(r.importedBy.length).padStart(2)} | File: ${r.file}`
  );
});

if (violationsCount > 0 || cycles.length > 0) {
  console.error("\n❌ Blast Radius Audit Failed with violations!");
  process.exit(1);
} else {
  console.log("\n✅ All Architectural Isolation & Blast Radius Constraints Satisfied.\n");
}
