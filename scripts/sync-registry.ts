import fs from 'fs';
import path from 'path';
import { components } from './registry-components';

function updateRegistryComponents() {
  const iconsDir = path.join(process.cwd(), 'icons');
  const existingComponents = new Map(
    components.map((c) => [path.basename(c.path.replace('../icons/', '')), c])
  );

  const newComponents = [];

  const files = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith('.tsx') && file !== 'index.ts');

  for (const file of files) {
    if (!existingComponents.has(file)) {
      const name = path.basename(file, '.tsx');
      newComponents.push({
        name,
        path: path.join(__dirname, '../icons', file),
        registryDependencies: [],
        dependencies: ['motion'],
      });
    }
  }

  if (newComponents.length === 0) {
    console.log('no new components to add.');
    return;
  }

  const registryPath = path.join(__dirname, 'registry-components.ts');
  const content = fs.readFileSync(registryPath, 'utf8');

  const lastComponentIndex = content.lastIndexOf('}');

  const newComponentsString = newComponents
    .map(
      (comp) => `  {
    'name': '${comp.name}',
    'path': path.join(__dirname, '../icons/${path.basename(comp.path)}'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  }`
    )
    .join(',\n');

  const updatedContent =
    content.slice(0, lastComponentIndex + 1) +
    ',\n' +
    newComponentsString +
    '\n];';

  fs.writeFileSync(registryPath, updatedContent);

  console.log(`added ${newComponents.length} new components:`);
  console.log(newComponents.map((c) => c.name).join(', '));
}

updateRegistryComponents();
