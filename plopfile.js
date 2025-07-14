export default function (plop) {
  // FSD layers in dependency order
  const FSD_LAYERS = [
    'shared',
    'entities',
    'features', 
    'widgets',
    'processes',
    'pages',
    'app'
  ];

  // Generator for barrel files
  plop.setGenerator('barrel', {
    description: 'Generate barrel index.ts files for FSD layers',
    prompts: [
      {
        type: 'checkbox',
        name: 'layers',
        message: 'Which FSD layers should have barrel files generated?',
        choices: FSD_LAYERS,
        default: FSD_LAYERS
      },
      {
        type: 'input',
        name: 'path',
        message: 'Specific path within layer (optional, e.g., "ui/components"):',
        default: ''
      }
    ],
    actions: function(data) {
      const actions = [];
      
      data.layers.forEach(layer => {
        const basePath = data.path ? `src/${layer}/${data.path}` : `src/${layer}`;
        
        actions.push({
          type: 'add',
          path: `${basePath}/index.ts`,
          templateFile: 'plop-templates/barrel.hbs',
          skipIfExists: false,
          data: {
            layer: layer,
            path: data.path
          }
        });
      });
      
      return actions;
    }
  });

  // Generator for FSD slice structure
  plop.setGenerator('fsd-slice', {
    description: 'Generate complete FSD slice structure',
    prompts: [
      {
        type: 'list',
        name: 'layer',
        message: 'Which FSD layer?',
        choices: FSD_LAYERS.filter(layer => !['app', 'processes'].includes(layer))
      },
      {
        type: 'input',
        name: 'name',
        message: 'Slice name:',
        validate: function(value) {
          if (!value) return 'Slice name is required';
          if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value)) {
            return 'Slice name must start with letter and contain only letters, numbers, hyphens, and underscores';
          }
          return true;
        }
      },
      {
        type: 'checkbox',
        name: 'segments',
        message: 'Which segments to include?',
        choices: [
          { name: 'ui (UI components)', value: 'ui', checked: true },
          { name: 'model (Business logic)', value: 'model', checked: true },
          { name: 'api (API layer)', value: 'api', checked: true },
          { name: 'lib (Utilities)', value: 'lib', checked: false },
          { name: 'config (Configuration)', value: 'config', checked: false }
        ]
      }
    ],
    actions: function(data) {
      const actions = [];
      const basePath = `src/${data.layer}/${data.name}`;
      
      // Generate segments
      data.segments.forEach(segment => {
        actions.push({
          type: 'add',
          path: `${basePath}/${segment}/index.ts`,
          templateFile: 'plop-templates/segment.hbs',
          data: {
            layer: data.layer,
            slice: data.name,
            segment: segment
          }
        });
      });
      
      // Generate main barrel file
      actions.push({
        type: 'add',
        path: `${basePath}/index.ts`,
        templateFile: 'plop-templates/slice-barrel.hbs',
        data: {
          layer: data.layer,
          slice: data.name,
          segments: data.segments
        }
      });
      
      return actions;
    }
  });

  // Helper to generate export statements
  plop.setHelper('exportStatement', function(segments) {
    return segments.map(segment => `export * from './${segment}';`).join('\n');
  });

  // Helper to capitalize first letter
  plop.setHelper('capitalize', function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  // Helper to generate segment comment
  plop.setHelper('segmentComment', function(segment, layer, slice) {
    const comments = {
      ui: 'UI components and related presentation logic',
      model: 'Business logic, state management, and data types',
      api: 'API calls and data fetching logic',
      lib: 'Utility functions and helpers',
      config: 'Configuration and constants'
    };
    
    return `// ${comments[segment] || 'Segment exports'} for ${layer}/${slice}`;
  });
}
