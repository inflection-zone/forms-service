/**
 * Field Library Usage Examples
 * 
 * This file demonstrates how to use the comprehensive field library
 * with built-in logic, validation, and schema structures.
 */

import { FieldRegistry } from '../services/field-registry';
import { FieldFactory } from '../services/field-factory';
import { ValidationEngine } from '../services/validation-engine';
import { FieldRenderer } from '../services/field-renderer';
import { FieldHelpers } from '../utils/field-helpers';
import { ValidationHelpers } from '../utils/validation-helpers';
import { ConfigurationHelpers } from '../utils/configuration-helpers';

// Initialize services
const registry = FieldRegistry.getInstance();
const factory = new FieldFactory();
const validator = new ValidationEngine();
const renderer = FieldRenderer.getInstance();

export class FieldLibraryExample {
  /**
   * Example 1: Basic field creation and usage
   */
  public static basicFieldExample(): void {
    console.log('=== Basic Field Example ===');

    // Create a text field instance
    const textField = factory.createFieldInstance('shortText', {
      placeholder: 'Enter your name...',
      maxLength: 50,
      required: true
    });

    if (textField) {
      console.log('Created text field:', FieldHelpers.getDisplayName(textField));
      console.log('Field type:', FieldHelpers.getResponseType(textField));
      console.log('Is required:', FieldHelpers.isRequired(textField));

      // Set a value
      FieldHelpers.setValue(textField, 'John Doe');
      console.log('Field value:', FieldHelpers.getValue(textField));

      // Check if field has changed
      console.log('Has changed:', FieldHelpers.hasChanged(textField));

      // Format value for display
      console.log('Formatted value:', FieldHelpers.formatValue(textField));
    }
  }

  /**
   * Example 2: Field validation
   */
  public static validationExample(): void {
    console.log('\n=== Validation Example ===');

    // Create an email field
    const emailField = factory.createFieldInstance('email', {
      placeholder: 'Enter your email...',
      required: true
    });

    if (emailField) {
      // Test with invalid email
      FieldHelpers.setValue(emailField, 'invalid-email');
      
      const context = {
        fieldId: emailField.id,
        fieldValue: emailField.value,
        formData: { [emailField.id]: emailField.value },
        fieldConfiguration: emailField.configuration,
        dependencies: {}
      };

      validator.validateField(emailField.id, emailField.value, context)
        .then(result => {
          console.log('Validation result:', result);
          console.log('Is valid:', result.isValid);
          console.log('Errors:', result.errors);
        });

      // Test with valid email
      FieldHelpers.setValue(emailField, 'john.doe@example.com');
      
      validator.validateField(emailField.id, emailField.value, context)
        .then(result => {
          console.log('Valid email validation:', result);
        });
    }
  }

  /**
   * Example 3: Field rendering
   */
  public static renderingExample(): void {
    console.log('\n=== Rendering Example ===');

    // Create a select field
    const selectField = factory.createFieldInstance('dropdown', {
      options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' }
      ],
      placeholder: 'Select a country...',
      required: true
    });

    if (selectField) {
      // Render as HTML
      const html = renderer.renderField(selectField, {
        theme: 'material',
        size: 'large'
      });
      console.log('Rendered HTML:', html);

      // Render as React component
      const reactJSX = renderer.renderReactComponent(selectField);
      console.log('React JSX:', reactJSX);
    }
  }

  /**
   * Example 4: Field configuration
   */
  public static configurationExample(): void {
    console.log('\n=== Configuration Example ===');

    // Create a currency field with custom configuration
    const currencyField = factory.createFieldInstance('currency', {
      currency: 'EUR',
      symbol: '€',
      symbolPosition: 'after',
      decimalPlaces: 2,
      min: 0,
      max: 10000
    });

    if (currencyField) {
      console.log('Currency field configuration:', currencyField.configuration);
      
      // Validate configuration
      const validation = factory.validateFieldConfiguration('currency', currencyField.configuration);
      console.log('Configuration validation:', validation);

      // Get configuration value
      const currency = FieldHelpers.getConfigurationValue(currencyField, 'currency', 'USD');
      console.log('Currency setting:', currency);

      // Set configuration value
      FieldHelpers.setConfigurationValue(currencyField, 'currency', 'GBP');
      console.log('Updated currency:', FieldHelpers.getConfigurationValue(currencyField, 'currency'));
    }
  }

  /**
   * Example 5: Field registry and search
   */
  public static registryExample(): void {
    console.log('\n=== Registry Example ===');

    // Get all fields
    const allFields = registry.getAllFields();
    console.log('Total fields available:', allFields.length);

    // Get fields by category
    const textFields = registry.getFieldsByCategory('text-based');
    console.log('Text fields:', textFields.map(f => f.name));

    const numericFields = registry.getFieldsByCategory('numeric');
    console.log('Numeric fields:', numericFields.map(f => f.name));

    // Search fields
    const searchResults = registry.searchFields('email');
    console.log('Search results for "email":', searchResults.map(f => f.name));

    // Get field recommendations
    const recommendations = registry.getFieldRecommendations('contact');
    console.log('Field recommendations for "contact":', recommendations.map(f => f.name));

    // Get field statistics
    const stats = registry.getStatistics();
    console.log('Field library statistics:', stats);
  }

  /**
   * Example 6: Custom validation rules
   */
  public static customValidationExample(): void {
    console.log('\n=== Custom Validation Example ===');

    // Create a custom validation rule
    const customRule = ValidationHelpers.createCustomRule(
      'custom-phone-validation',
      (value: string) => value.startsWith('+1'),
      'Phone number must start with +1',
      true,
      10
    );

    // Add to validation engine
    validator.addCustomValidator(customRule);

    // Create a phone field
    const phoneField = factory.createFieldInstance('phone', {
      placeholder: 'Enter phone number...',
      required: true
    });

    if (phoneField) {
      // Test with valid phone
      FieldHelpers.setValue(phoneField, '+1-555-123-4567');
      
      const context = {
        fieldId: phoneField.id,
        fieldValue: phoneField.value,
        formData: { [phoneField.id]: phoneField.value },
        fieldConfiguration: phoneField.configuration,
        dependencies: {}
      };

      validator.validateField(phoneField.id, phoneField.value, context)
        .then(result => {
          console.log('Custom validation result:', result);
        });
    }
  }

  /**
   * Example 7: Field groups and dependencies
   */
  public static fieldGroupExample(): void {
    console.log('\n=== Field Group Example ===');

    // Create a field group
    const fieldGroup = factory.createFieldGroup({
      name: 'Contact Information',
      fields: [
        { fieldId: 'shortText', configuration: { placeholder: 'First Name' } },
        { fieldId: 'shortText', configuration: { placeholder: 'Last Name' } },
        { fieldId: 'email', configuration: { placeholder: 'Email Address' } },
        { fieldId: 'phone', configuration: { placeholder: 'Phone Number' } }
      ],
      layout: 'vertical',
      dependencies: [
        { from: 'email', to: 'phone', condition: 'not-empty' }
      ]
    });

    console.log('Created field group with', fieldGroup.length, 'fields');
    fieldGroup.forEach(field => {
      console.log(`- ${FieldHelpers.getDisplayName(field)} (${FieldHelpers.getResponseType(field)})`);
    });
  }

  /**
   * Example 8: Conditional fields
   */
  public static conditionalFieldExample(): void {
    console.log('\n=== Conditional Field Example ===');

    // Create a conditional field
    const conditionalField = factory.createConditionalField(
      'shortText',
      {
        field: 'hasCompany',
        operator: 'equals',
        value: true
      },
      {
        placeholder: 'Enter company name...',
        required: true
      }
    );

    if (conditionalField) {
      console.log('Created conditional field:', FieldHelpers.getDisplayName(conditionalField));
      console.log('Is conditional:', FieldHelpers.isConditional(conditionalField));
      console.log('Conditional config:', FieldHelpers.getConditionalConfig(conditionalField));
    }
  }

  /**
   * Example 9: Calculated fields
   */
  public static calculatedFieldExample(): void {
    console.log('\n=== Calculated Field Example ===');

    // Create a calculated field
    const calculatedField = factory.createCalculatedField(
      'number',
      'price * quantity * tax',
      ['price', 'quantity', 'tax'],
      {
        placeholder: 'Total Amount',
        readonly: true
      }
    );

    if (calculatedField) {
      console.log('Created calculated field:', FieldHelpers.getDisplayName(calculatedField));
      console.log('Is calculated:', FieldHelpers.isCalculated(calculatedField));
      console.log('Formula:', FieldHelpers.getCalculationFormula(calculatedField));
      console.log('Dependencies:', FieldHelpers.getCalculationDependencies(calculatedField));
    }
  }

  /**
   * Example 10: Field styling and theming
   */
  public static stylingExample(): void {
    console.log('\n=== Styling Example ===');

    // Create a styled field
    const styledField = factory.createStyledField(
      'shortText',
      {
        theme: 'material',
        size: 'large',
        variant: 'filled',
        className: 'custom-field',
        style: {
          backgroundColor: '#f5f5f5',
          borderColor: '#2196f3'
        }
      },
      {
        placeholder: 'Styled input field...'
      }
    );

    if (styledField) {
      console.log('Created styled field:', FieldHelpers.getDisplayName(styledField));
      console.log('Has styling:', FieldHelpers.hasStyling(styledField));
      console.log('Styling config:', FieldHelpers.getStyling(styledField));

      // Render with styling
      const html = renderer.renderField(styledField);
      console.log('Styled HTML:', html);
    }
  }

  /**
   * Run all examples
   */
  public static runAllExamples(): void {
    console.log('🚀 Field Library Examples\n');
    
    this.basicFieldExample();
    this.validationExample();
    this.renderingExample();
    this.configurationExample();
    this.registryExample();
    this.customValidationExample();
    this.fieldGroupExample();
    this.conditionalFieldExample();
    this.calculatedFieldExample();
    this.stylingExample();
    
    console.log('\n✅ All examples completed!');
  }
}

// Export for use in other modules
export default FieldLibraryExample;
