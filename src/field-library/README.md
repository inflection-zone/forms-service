# Field Library - Comprehensive Form Field Categories & Types

A comprehensive field library with built-in logic, validation, and schema structures for all major form field types. This library provides a complete solution for dynamic form generation with extensive customization options.

## 🚀 Features

- **Comprehensive Field Types**: 50+ field types across 8 major categories
- **Built-in Validation**: Advanced validation engine with custom rule support
- **Dynamic Rendering**: Support for HTML, React, Vue, and Angular
- **Field Registry**: Centralized field management and discovery
- **Configuration System**: Flexible field configuration with presets
- **Accessibility Support**: Built-in accessibility features
- **Internationalization**: Multi-language support
- **TypeScript**: Full TypeScript support with type safety

## 📁 Structure

```
src/field-library/
├── types/                    # Type definitions
│   ├── field.types.ts       # Core field types
│   ├── validation.types.ts  # Validation types
│   └── configuration.types.ts # Configuration types
├── categories/               # Field categories
│   ├── text-fields.ts       # Text-based fields
│   ├── numeric-fields.ts    # Numeric fields
│   ├── selection-fields.ts  # Selection & choice fields
│   └── ...                  # Additional categories
├── services/                # Core services
│   ├── field-registry.ts    # Field registry
│   ├── field-factory.ts     # Field factory
│   ├── validation-engine.ts # Validation engine
│   └── field-renderer.ts    # Field renderer
├── utils/                   # Utility functions
│   ├── field-helpers.ts     # Field utilities
│   ├── validation-helpers.ts # Validation utilities
│   └── configuration-helpers.ts # Configuration utilities
├── examples/                # Usage examples
│   └── field-library-example.ts
└── index.ts                 # Main export file
```

## 🎯 Field Categories

### 1. Text-Based Fields
- **shortText**: Single line text input
- **longText**: Multi-line text input
- **email**: Email address input
- **password**: Masked text input
- **url**: Website URL input
- **search**: Search input with suggestions
- **richText**: WYSIWYG text editor

### 2. Numeric Fields
- **number**: Generic number input
- **currency**: Money amount input
- **percentage**: Percentage input (0-100)
- **phone**: Phone number input
- **zipCode**: Postal/ZIP code

### 3. Selection & Choice Fields
- **radio**: Single option selection
- **dropdown**: Dropdown menu selection
- **imageChoice**: Choice with images
- **buttonGroup**: Button-style selection
- **checkbox**: Multiple option selection
- **multiSelect**: Multi-select dropdown
- **tagInput**: Tag-style input
- **imageMultiChoice**: Multiple image selection

### 4. Date & Time Fields
- **date**: Date picker
- **time**: Time selector
- **datetime**: Date and time picker
- **dateRange**: Date range selector
- **timeRange**: Time range selector
- **recurring**: Recurring date pattern
- **birthday**: Birth date with age calculation

### 5. Rating & Feedback Fields
- **starRating**: Star-based rating
- **thumbsRating**: Thumbs up/down
- **emojiRating**: Emoji-based rating
- **sliderRating**: Slider-based rating
- **npsScore**: Net Promoter Score
- **likertScale**: Agreement scale

### 6. Advanced Input Fields
- **height**: Height measurement
- **weight**: Weight measurement
- **temperature**: Temperature input
- **distance**: Distance measurement
- **area**: Area measurement
- **volume**: Volume measurement

### 7. Geographic Fields
- **address**: Complete address
- **location**: GPS coordinates
- **country**: Country selection
- **state**: State/province selection
- **city**: City selection
- **timezone**: Timezone selection

### 8. Media & File Fields
- **fileUpload**: Single file upload
- **multiFileUpload**: Multiple file upload
- **imageUpload**: Image-specific upload
- **videoUpload**: Video file upload
- **audioUpload**: Audio file upload
- **documentUpload**: Document upload
- **signature**: Digital signature capture

## 🛠️ Usage

### Basic Usage

```typescript
import { FieldRegistry, FieldFactory, ValidationEngine } from './field-library';

// Initialize services
const registry = FieldRegistry.getInstance();
const factory = new FieldFactory();
const validator = new ValidationEngine();

// Create a field instance
const textField = factory.createFieldInstance('shortText', {
  placeholder: 'Enter your name...',
  maxLength: 50,
  required: true
});

// Validate the field
const context = {
  fieldId: textField.id,
  fieldValue: textField.value,
  formData: { [textField.id]: textField.value },
  fieldConfiguration: textField.configuration,
  dependencies: {}
};

const validationResult = await validator.validateField(
  textField.id, 
  textField.value, 
  context
);

console.log('Is valid:', validationResult.isValid);
console.log('Errors:', validationResult.errors);
```

### Field Registry

```typescript
// Get all fields
const allFields = registry.getAllFields();

// Get fields by category
const textFields = registry.getFieldsByCategory('text-based');

// Search fields
const searchResults = registry.searchFields('email');

// Get field recommendations
const recommendations = registry.getFieldRecommendations('contact');
```

### Field Factory

```typescript
// Create field with custom configuration
const emailField = factory.createFieldInstance('email', {
  placeholder: 'Enter your email...',
  required: true,
  domainRestrictions: ['company.com']
});

// Create conditional field
const conditionalField = factory.createConditionalField(
  'shortText',
  {
    field: 'hasCompany',
    operator: 'equals',
    value: true
  },
  { placeholder: 'Company name...' }
);

// Create calculated field
const calculatedField = factory.createCalculatedField(
  'number',
  'price * quantity * tax',
  ['price', 'quantity', 'tax'],
  { readonly: true }
);
```

### Validation Engine

```typescript
// Add custom validation rule
const customRule = {
  id: 'custom-phone',
  type: 'custom',
  message: 'Phone must start with +1',
  enabled: true,
  priority: 10,
  customValidator: async (context) => {
    const isValid = context.fieldValue.startsWith('+1');
    return {
      isValid,
      message: isValid ? 'Valid phone' : 'Phone must start with +1',
      severity: 'error'
    };
  }
};

validator.addCustomValidator(customRule);

// Validate form
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1-555-123-4567'
};

const formValidation = await validator.validateForm(formData);
console.log('Form is valid:', formValidation.isValid);
```

### Field Rendering

```typescript
import { FieldRenderer } from './field-library';

const renderer = FieldRenderer.getInstance();

// Render as HTML
const html = renderer.renderField(field, {
  theme: 'material',
  size: 'large',
  variant: 'outlined'
});

// Render as React component
const reactJSX = renderer.renderReactComponent(field);

// Render as Vue component
const vueTemplate = renderer.renderVueComponent(field);
```

## 🔧 Configuration

### Field Configuration Options

Each field type supports various configuration options:

```typescript
const fieldConfig = {
  // Common options
  placeholder: 'Enter value...',
  helpText: 'Additional help text',
  required: true,
  disabled: false,
  readonly: false,
  
  // Validation options
  minLength: 2,
  maxLength: 100,
  pattern: '^[a-zA-Z]+$',
  min: 0,
  max: 100,
  
  // Field-specific options
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ],
  currency: 'USD',
  decimalPlaces: 2,
  dateFormat: 'MM/DD/YYYY'
};
```

### Validation Rules

```typescript
const validationRules = [
  {
    type: 'required',
    message: 'This field is required'
  },
  {
    type: 'minLength',
    value: 2,
    message: 'Must be at least 2 characters'
  },
  {
    type: 'pattern',
    value: '^[a-zA-Z]+$',
    message: 'Only letters allowed'
  }
];
```

## 🎨 Theming and Styling

### Built-in Themes
- **default**: Clean, minimal design
- **material**: Material Design inspired
- **bootstrap**: Bootstrap compatible
- **tailwind**: Tailwind CSS compatible

### Custom Styling

```typescript
const styledField = factory.createStyledField(
  'shortText',
  {
    theme: 'material',
    size: 'large',
    variant: 'filled',
    className: 'custom-field',
    style: {
      backgroundColor: '#f5f5f5',
      borderColor: '#2196f3',
      borderRadius: '8px'
    }
  }
);
```

## ♿ Accessibility

The field library includes built-in accessibility features:

```typescript
const accessibleField = factory.createAccessibleField(
  'shortText',
  {
    ariaLabel: 'User name input field',
    ariaDescription: 'Enter your full name as it appears on official documents',
    keyboardNavigation: true,
    screenReaderSupport: true
  }
);
```

## 🌍 Internationalization

Support for multiple languages and locales:

```typescript
const i18nField = factory.createInternationalizedField(
  'date',
  {
    locale: 'en-US',
    translations: {
      placeholder: 'Select date',
      helpText: 'Choose your preferred date'
    },
    dateFormat: 'MM/DD/YYYY'
  }
);
```

## 📊 Field Statistics

Get comprehensive statistics about your field library:

```typescript
const stats = registry.getStatistics();
console.log('Total fields:', stats.totalFields);
console.log('Categories:', stats.categories);
console.log('Field count by category:', stats.fieldCountByCategory);
console.log('Response types:', stats.responseTypes);
```

## 🔍 Field Discovery

Find the right field for your use case:

```typescript
// Search by name or description
const searchResults = registry.searchFields('email');

// Get recommendations based on use case
const recommendations = registry.getFieldRecommendations('contact form');

// Get similar fields
const similarFields = registry.getSimilarFields('shortText', 5);
```

## 🧪 Testing

The field library includes comprehensive testing utilities:

```typescript
import { ValidationHelpers } from './field-library/utils/validation-helpers';

// Test validation rules
const result = ValidationHelpers.validateEmail('test@example.com');
console.log('Email validation:', result.isValid);

// Test field configuration
const configValidation = ConfigurationHelpers.validateConfiguration(
  fieldConfig,
  fieldSchema
);
```

## 📈 Performance

- **Lazy Loading**: Fields are loaded on demand
- **Caching**: Field definitions are cached for performance
- **Tree Shaking**: Only used fields are included in the bundle
- **Minimal Dependencies**: Lightweight with minimal external dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your field type or enhancement
4. Add tests and documentation
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the examples in `/examples`

---

**Built with ❤️ for the developer community**
