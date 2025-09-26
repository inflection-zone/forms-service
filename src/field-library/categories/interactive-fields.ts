/**
 * Interactive & Advanced field definitions
 * Category: Interactive & Advanced Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const INTERACTIVE_FIELDS: FieldDefinition[] = [
  // Dynamic Fields
  {
    id: 'conditional',
    name: 'Conditional Field',
    category: 'interactive-advanced',
    type: 'conditional',
    responseType: 'Object',
    description: 'Show/hide based on logic',
    icon: 'material-symbols:account-tree',
    htmlType: 'text',
    component: 'ConditionalField',
    validationOptions: [
      {
        type: 'required',
        message: 'This field is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'This field appears conditionally...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'conditions',
        type: 'array',
        defaultValue: [],
        description: 'Conditional logic rules'
      },
      {
        key: 'defaultVisibility',
        type: 'boolean',
        defaultValue: false,
        description: 'Default visibility state'
      },
      {
        key: 'animation',
        type: 'string',
        defaultValue: 'fade',
        description: 'Show/hide animation',
        options: ['none', 'fade', 'slide', 'bounce']
      },
      {
        key: 'animationDuration',
        type: 'number',
        defaultValue: 300,
        description: 'Animation duration in milliseconds',
        min: 100,
        max: 2000
      },
      {
        key: 'clearOnHide',
        type: 'boolean',
        defaultValue: true,
        description: 'Clear field value when hidden'
      },
      {
        key: 'validateOnShow',
        type: 'boolean',
        defaultValue: true,
        description: 'Validate field when shown'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Smart forms', 'Dynamic questionnaires', 'Conditional logic', 'Progressive disclosure'],
    accessibility: {
      ariaLabel: 'Conditional field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'calculated',
    name: 'Calculated Field',
    category: 'interactive-advanced',
    type: 'calculated',
    responseType: 'Object',
    description: 'Auto-calculated values',
    icon: 'material-symbols:calculate',
    htmlType: 'text',
    component: 'CalculatedField',
    validationOptions: [],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Calculated value...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'formula',
        type: 'string',
        defaultValue: '',
        description: 'Calculation formula'
      },
      {
        key: 'dependencies',
        type: 'array',
        defaultValue: [],
        description: 'Field dependencies for calculation'
      },
      {
        key: 'resultType',
        type: 'string',
        defaultValue: 'number',
        description: 'Result data type',
        options: ['number', 'text', 'boolean', 'date', 'currency']
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 2,
        description: 'Number of decimal places',
        min: 0,
        max: 10
      },
      {
        key: 'currency',
        type: 'string',
        defaultValue: 'USD',
        description: 'Currency for calculations',
        options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']
      },
      {
        key: 'readonly',
        type: 'boolean',
        defaultValue: true,
        description: 'Make field read-only'
      },
      {
        key: 'showFormula',
        type: 'boolean',
        defaultValue: false,
        description: 'Show calculation formula'
      },
      {
        key: 'updateOnChange',
        type: 'boolean',
        defaultValue: true,
        description: 'Update on dependency changes'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Order forms', 'Financial calculations', 'Tax calculations', 'Price calculations'],
    accessibility: {
      ariaLabel: 'Calculated field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'repeatable',
    name: 'Repeatable Field',
    category: 'interactive-advanced',
    type: 'repeatable',
    responseType: 'Array',
    description: 'Repeating field groups',
    icon: 'material-symbols:content-copy',
    htmlType: 'text',
    component: 'RepeatableField',
    validationOptions: [
      {
        type: 'required',
        message: 'At least one item is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Add new item...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'template',
        type: 'object',
        defaultValue: {},
        description: 'Field template for each item'
      },
      {
        key: 'minItems',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum number of items',
        min: 0,
        max: 10
      },
      {
        key: 'maxItems',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of items',
        min: 1,
        max: 100
      },
      {
        key: 'addButtonText',
        type: 'string',
        defaultValue: 'Add Item',
        description: 'Text for add button'
      },
      {
        key: 'removeButtonText',
        type: 'string',
        defaultValue: 'Remove',
        description: 'Text for remove button'
      },
      {
        key: 'allowReorder',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow reordering items'
      },
      {
        key: 'showIndex',
        type: 'boolean',
        defaultValue: true,
        description: 'Show item index numbers'
      },
      {
        key: 'duplicateButton',
        type: 'boolean',
        defaultValue: true,
        description: 'Show duplicate button'
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Contact lists', 'Product variants', 'Dynamic forms', 'Repeating sections'],
    accessibility: {
      ariaLabel: 'Repeatable field group',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'lookup',
    name: 'Lookup Field',
    category: 'interactive-advanced',
    type: 'lookup',
    responseType: 'Text',
    description: 'Database lookup',
    icon: 'material-symbols:search',
    htmlType: 'text',
    component: 'LookupField',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select a value'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Search and select...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'dataSource',
        type: 'string',
        defaultValue: '',
        description: 'Data source URL or identifier'
      },
      {
        key: 'searchFields',
        type: 'array',
        defaultValue: ['name', 'title'],
        description: 'Fields to search in'
      },
      {
        key: 'displayField',
        type: 'string',
        defaultValue: 'name',
        description: 'Field to display in results'
      },
      {
        key: 'valueField',
        type: 'string',
        defaultValue: 'id',
        description: 'Field to use as value'
      },
      {
        key: 'minSearchLength',
        type: 'number',
        defaultValue: 2,
        description: 'Minimum characters to trigger search',
        min: 1,
        max: 10
      },
      {
        key: 'maxResults',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of results',
        min: 5,
        max: 100
      },
      {
        key: 'debounceDelay',
        type: 'number',
        defaultValue: 300,
        description: 'Search debounce delay in milliseconds',
        min: 100,
        max: 2000
      },
      {
        key: 'allowCustom',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow custom entries'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Reference data', 'User selection', 'Product lookup', 'Database queries'],
    accessibility: {
      ariaLabel: 'Lookup field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'autocomplete',
    name: 'Autocomplete',
    category: 'interactive-advanced',
    type: 'autocomplete',
    responseType: 'Text',
    description: 'Smart suggestions',
    icon: 'magic',
    htmlType: 'text',
    component: 'AutocompleteField',
    validationOptions: [
      {
        type: 'required',
        message: 'Please enter a value'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Start typing...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'dataSource',
        type: 'string',
        defaultValue: '',
        description: 'Data source for suggestions'
      },
      {
        key: 'matchingRules',
        type: 'object',
        defaultValue: { type: 'contains', caseSensitive: false },
        description: 'Text matching rules'
      },
      {
        key: 'minLength',
        type: 'number',
        defaultValue: 2,
        description: 'Minimum characters to show suggestions',
        min: 1,
        max: 10
      },
      {
        key: 'maxSuggestions',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of suggestions',
        min: 1,
        max: 50
      },
      {
        key: 'debounceDelay',
        type: 'number',
        defaultValue: 300,
        description: 'Debounce delay in milliseconds',
        min: 100,
        max: 2000
      },
      {
        key: 'highlightMatch',
        type: 'boolean',
        defaultValue: true,
        description: 'Highlight matching text'
      },
      {
        key: 'allowCustom',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow custom entries'
      },
      {
        key: 'showClear',
        type: 'boolean',
        defaultValue: true,
        description: 'Show clear button'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Efficient input', 'Search suggestions', 'Data entry', 'User experience'],
    accessibility: {
      ariaLabel: 'Autocomplete field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'cascading',
    name: 'Cascading Dropdown',
    category: 'interactive-advanced',
    type: 'cascading',
    responseType: 'SingleChoiceSelection',
    description: 'Dependent dropdowns',
    icon: 'material-symbols:account-tree',
    htmlType: 'select',
    component: 'CascadingSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select a value'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'levels',
        type: 'array',
        defaultValue: [],
        description: 'Cascading dropdown levels'
      },
      {
        key: 'dataSource',
        type: 'string',
        defaultValue: '',
        description: 'Data source for cascading options'
      },
      {
        key: 'loadingText',
        type: 'string',
        defaultValue: 'Loading...',
        description: 'Text shown while loading'
      },
      {
        key: 'clearOnChange',
        type: 'boolean',
        defaultValue: true,
        description: 'Clear dependent fields on change'
      },
      {
        key: 'showLevels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show level indicators'
      },
      {
        key: 'allowSkip',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow skipping levels'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Location selection', 'Category navigation', 'Hierarchical data', 'Multi-level forms'],
    accessibility: {
      ariaLabel: 'Cascading dropdown field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  // Specialized Input
  {
    id: 'colorPicker',
    name: 'Color Picker',
    category: 'interactive-advanced',
    type: 'color',
    responseType: 'Text',
    description: 'Color selection',
    icon: 'material-symbols:palette',
    htmlType: 'color',
    component: 'ColorPicker',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select a color'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select a color...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: 'hex',
        description: 'Color format',
        options: ['hex', 'rgb', 'hsl', 'all']
      },
      {
        key: 'palette',
        type: 'array',
        defaultValue: [],
        description: 'Custom color palette'
      },
      {
        key: 'showPresets',
        type: 'boolean',
        defaultValue: true,
        description: 'Show preset colors'
      },
      {
        key: 'showInput',
        type: 'boolean',
        defaultValue: true,
        description: 'Show color input field'
      },
      {
        key: 'showPreview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show color preview'
      },
      {
        key: 'allowCustom',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow custom color input'
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Color picker size',
        options: ['small', 'medium', 'large']
      }
    ],
    defaultValue: '#000000',
    required: false,
    useCases: ['Design forms', 'Theme customization', 'Color selection', 'Visual preferences'],
    accessibility: {
      ariaLabel: 'Color picker field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'codeEditor',
    name: 'Code Editor',
    category: 'interactive-advanced',
    type: 'code',
    responseType: 'Text',
    description: 'Syntax-highlighted code',
    icon: 'material-symbols:code',
    htmlType: 'textarea',
    component: 'CodeEditor',
    validationOptions: [
      {
        type: 'required',
        message: 'Code is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter code...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'language',
        type: 'string',
        defaultValue: 'javascript',
        description: 'Programming language',
        options: ['javascript', 'python', 'java', 'html', 'css', 'sql', 'json', 'xml', 'yaml']
      },
      {
        key: 'theme',
        type: 'string',
        defaultValue: 'default',
        description: 'Editor theme',
        options: ['default', 'dark', 'light', 'monokai', 'github']
      },
      {
        key: 'height',
        type: 'number',
        defaultValue: 200,
        description: 'Editor height in pixels',
        min: 100,
        max: 800
      },
      {
        key: 'showLineNumbers',
        type: 'boolean',
        defaultValue: true,
        description: 'Show line numbers'
      },
      {
        key: 'showMinimap',
        type: 'boolean',
        defaultValue: false,
        description: 'Show minimap'
      },
      {
        key: 'readonly',
        type: 'boolean',
        defaultValue: false,
        description: 'Make editor read-only'
      },
      {
        key: 'tabSize',
        type: 'number',
        defaultValue: 2,
        description: 'Tab size',
        min: 1,
        max: 8
      },
      {
        key: 'wordWrap',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable word wrap'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Developer forms', 'Code submission', 'Technical documentation', 'Script editing'],
    accessibility: {
      ariaLabel: 'Code editor field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'formula',
    name: 'Formula Field',
    category: 'interactive-advanced',
    type: 'formula',
    responseType: 'Text',
    description: 'Mathematical expressions',
    icon: 'material-symbols:functions',
    htmlType: 'text',
    component: 'FormulaField',
    validationOptions: [
      {
        type: 'required',
        message: 'Formula is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter formula...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'allowedFunctions',
        type: 'array',
        defaultValue: ['+', '-', '*', '/', '^', 'sqrt', 'sin', 'cos', 'tan'],
        description: 'Allowed mathematical functions'
      },
      {
        key: 'variables',
        type: 'array',
        defaultValue: [],
        description: 'Available variables'
      },
      {
        key: 'showPreview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show formula preview'
      },
      {
        key: 'showResult',
        type: 'boolean',
        defaultValue: true,
        description: 'Show calculation result'
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 2,
        description: 'Result decimal places',
        min: 0,
        max: 10
      },
      {
        key: 'validateSyntax',
        type: 'boolean',
        defaultValue: true,
        description: 'Validate formula syntax'
      },
      {
        key: 'showHelp',
        type: 'boolean',
        defaultValue: true,
        description: 'Show formula help'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Scientific forms', 'Mathematical calculations', 'Engineering forms', 'Research studies'],
    accessibility: {
      ariaLabel: 'Formula field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'drawing',
    name: 'Drawing Canvas',
    category: 'interactive-advanced',
    type: 'drawing',
    responseType: 'File',
    description: 'Freehand drawing canvas',
    icon: 'material-symbols:brush',
    htmlType: 'text',
    component: 'DrawingCanvas',
    validationOptions: [
      {
        type: 'required',
        message: 'Drawing is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Draw here...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'width',
        type: 'number',
        defaultValue: 400,
        description: 'Canvas width in pixels',
        min: 200,
        max: 1000
      },
      {
        key: 'height',
        type: 'number',
        defaultValue: 300,
        description: 'Canvas height in pixels',
        min: 150,
        max: 800
      },
      {
        key: 'tools',
        type: 'array',
        defaultValue: ['pen', 'eraser', 'line', 'rectangle', 'circle'],
        description: 'Available drawing tools',
        options: ['pen', 'eraser', 'line', 'rectangle', 'circle', 'text', 'arrow']
      },
      {
        key: 'colors',
        type: 'array',
        defaultValue: ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
        description: 'Available colors'
      },
      {
        key: 'brushSizes',
        type: 'array',
        defaultValue: [1, 3, 5, 10, 20],
        description: 'Available brush sizes'
      },
      {
        key: 'backgroundColor',
        type: 'string',
        defaultValue: '#FFFFFF',
        description: 'Canvas background color'
      },
      {
        key: 'exportFormat',
        type: 'string',
        defaultValue: 'png',
        description: 'Export format',
        options: ['png', 'jpg', 'svg', 'pdf']
      },
      {
        key: 'showGrid',
        type: 'boolean',
        defaultValue: false,
        description: 'Show drawing grid'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Creative forms', 'Sketching', 'Design feedback', 'Artistic expression'],
    accessibility: {
      ariaLabel: 'Drawing canvas field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'barcode',
    name: 'Barcode Scanner',
    category: 'interactive-advanced',
    type: 'barcode',
    responseType: 'Text',
    description: 'Barcode scanner',
    icon: 'material-symbols:qr-code',
    htmlType: 'text',
    component: 'BarcodeScanner',
    validationOptions: [
      {
        type: 'required',
        message: 'Please scan a barcode'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Scan barcode...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'formats',
        type: 'array',
        defaultValue: ['code128', 'ean13', 'ean8', 'upc', 'qr'],
        description: 'Supported barcode formats',
        options: ['code128', 'ean13', 'ean8', 'upc', 'qr', 'code39', 'code93']
      },
      {
        key: 'camera',
        type: 'boolean',
        defaultValue: true,
        description: 'Use camera for scanning'
      },
      {
        key: 'manualEntry',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow manual entry'
      },
      {
        key: 'validation',
        type: 'boolean',
        defaultValue: true,
        description: 'Validate barcode format'
      },
      {
        key: 'showPreview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show scan preview'
      },
      {
        key: 'beepSound',
        type: 'boolean',
        defaultValue: true,
        description: 'Play beep sound on scan'
      },
      {
        key: 'autoSubmit',
        type: 'boolean',
        defaultValue: false,
        description: 'Auto-submit on successful scan'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Inventory forms', 'Product identification', 'Asset tracking', 'Retail applications'],
    accessibility: {
      ariaLabel: 'Barcode scanner field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'qrcode',
    name: 'QR Code Scanner',
    category: 'interactive-advanced',
    type: 'qrcode',
    responseType: 'Text',
    description: 'QR code scanner',
    icon: 'material-symbols:qr-code',
    htmlType: 'text',
    component: 'QRCodeScanner',
    validationOptions: [
      {
        type: 'required',
        message: 'Please scan a QR code'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Scan QR code...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'camera',
        type: 'boolean',
        defaultValue: true,
        description: 'Use camera for scanning'
      },
      {
        key: 'manualEntry',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow manual entry'
      },
      {
        key: 'validation',
        type: 'boolean',
        defaultValue: true,
        description: 'Validate QR code format'
      },
      {
        key: 'showPreview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show scan preview'
      },
      {
        key: 'beepSound',
        type: 'boolean',
        defaultValue: true,
        description: 'Play beep sound on scan'
      },
      {
        key: 'autoSubmit',
        type: 'boolean',
        defaultValue: false,
        description: 'Auto-submit on successful scan'
      },
      {
        key: 'expectedFormat',
        type: 'string',
        defaultValue: 'url',
        description: 'Expected QR code format',
        options: ['url', 'text', 'vcard', 'wifi', 'any']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Check-in forms', 'Contact sharing', 'WiFi setup', 'Mobile applications'],
    accessibility: {
      ariaLabel: 'QR code scanner field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const INTERACTIVE_FIELD_CATEGORY: FieldCategory = 'interactive-advanced';
