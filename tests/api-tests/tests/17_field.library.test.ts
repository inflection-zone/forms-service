/**
 * Field Library Comprehensive Test Suite
 * 
 * This test suite validates the complete field library implementation
 * including all field types, services, and utilities.
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { 
  FieldRegistry, 
  FieldFactory, 
  ValidationEngineService as ValidationEngine, 
  FieldRenderer,
  FieldHelpers,
  ValidationHelpers,
  ConfigurationHelpers,
  FieldDefinition,
  FieldInstance,
  FieldCategory,
  ResponseType,
  ValidationType
} from '../../../src/field-library';

describe('Field Library Comprehensive Tests', () => {
  let registry: FieldRegistry;
  let factory: FieldFactory;
  let validator: ValidationEngine;
  let renderer: FieldRenderer;

  beforeAll(() => {
    // Initialize services
    registry = FieldRegistry.getInstance();
    factory = new FieldFactory();
    validator = new ValidationEngine();
    renderer = FieldRenderer.getInstance();
  });

  afterAll(() => {
    // Cleanup if needed
  });

  describe('Field Registry Tests', () => {
    it('should initialize with all field categories', () => {
      const categories = registry.getCategories();
      expect(categories).toContain('text-based');
      expect(categories).toContain('numeric');
      expect(categories).toContain('selection-choice');
      expect(categories).toContain('date-time');
      expect(categories).toContain('rating-feedback');
      expect(categories).toContain('measurement');
      expect(categories).toContain('geographic');
      expect(categories).toContain('media-file');
      expect(categories).toContain('healthcare');
      expect(categories).toContain('business-professional');
      expect(categories).toContain('educational');
      expect(categories).toContain('e-commerce');
      expect(categories).toContain('survey-research');
      expect(categories).toContain('interactive-advanced');
    });

    it('should have a substantial number of field types', () => {
      const allFields = registry.getAllFields();
      expect(allFields.length).toBeGreaterThan(50); // Should have 100+ fields
    });

    it('should be able to get fields by category', () => {
      const textFields = registry.getFieldsByCategory('text-based');
      expect(textFields.length).toBeGreaterThan(0);
      
      const numericFields = registry.getFieldsByCategory('numeric');
      expect(numericFields.length).toBeGreaterThan(0);
    });

    it('should be able to search fields', () => {
      const searchResults = registry.searchFields('email');
      expect(searchResults.length).toBeGreaterThan(0);
      expect(searchResults.some(field => field.id.includes('email'))).toBe(true);
    });

    it('should be able to get field by ID', () => {
      const emailField = registry.getField('email');
      expect(emailField).toBeDefined();
      expect(emailField?.id).toBe('email');
      expect(emailField?.category).toBe('text-based');
    });

    it('should provide field statistics', () => {
      const stats = registry.getStatistics();
      expect(stats.totalFields).toBeGreaterThan(50);
      expect(stats.categories).toBeGreaterThan(10);
      expect(stats.fieldCountByCategory.size).toBeGreaterThan(10);
    });
  });

  describe('Field Factory Tests', () => {
    it('should create field instances', () => {
      const emailField = factory.createFieldInstance('email', {
        placeholder: 'Enter your email',
        required: true
      });
      
      expect(emailField).toBeDefined();
      expect(emailField?.definition.id).toBe('email');
      expect(emailField?.configuration.placeholder).toBe('Enter your email');
    });

    it('should create multiple field instances', () => {
      const fieldConfigs = [
        { fieldId: 'email', configuration: { required: true } },
        { fieldId: 'password', configuration: { minLength: 8 } },
        { fieldId: 'firstName', configuration: { required: true } }
      ];
      
      const instances = factory.createFieldInstances(fieldConfigs);
      expect(instances).toHaveLength(3);
      expect(instances.every(instance => instance !== null)).toBe(true);
    });

    it('should clone field instances', () => {
      const originalField = factory.createFieldInstance('email');
      expect(originalField).toBeDefined();
      
      const clonedField = factory.cloneFieldInstance(originalField!);
      expect(clonedField).toBeDefined();
      expect(clonedField?.definition.id).toBe(originalField?.definition.id);
      expect(clonedField).not.toBe(originalField); // Different objects
    });

    it('should create conditional fields', () => {
      const conditionalField = factory.createConditionalField(
        'lastName',
        {
          field: 'firstName',
          operator: 'notEquals',
          value: ''
        },
        { required: true }
      );
      
      expect(conditionalField).toBeDefined();
      expect(conditionalField?.definition.id).toBe('lastName');
    });

    it('should create calculated fields', () => {
      const calculatedField = factory.createCalculatedField(
        'fullName',
        'firstName + " " + lastName',
        ['firstName', 'lastName'],
        { readonly: true }
      );
      
      expect(calculatedField).toBeDefined();
      expect(calculatedField?.definition.id).toBe('fullName');
    });

    it('should validate field configuration', () => {
      const validation = factory.validateFieldConfiguration('email', {
        placeholder: 'Enter email',
        required: true,
        invalidOption: 'should be ignored'
      });
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('Validation Engine Tests', () => {
    it('should validate required fields', async () => {
      const result = await validator.validateField('email', '', {
        fieldId: 'email',
        fieldValue: '',
        formData: {},
        fieldConfiguration: { required: true },
        dependencies: {}
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate email format', async () => {
      const result = await validator.validateField('email', 'invalid-email', {
        fieldId: 'email',
        fieldValue: 'invalid-email',
        formData: {},
        fieldConfiguration: { type: 'email' },
        dependencies: {}
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('email'))).toBe(true);
    });

    it('should validate min/max length', async () => {
      const shortPassword = await validator.validateField('password', '123', {
        fieldId: 'password',
        fieldValue: '123',
        formData: {},
        fieldConfiguration: { minLength: 8 },
        dependencies: {}
      });
      
      expect(shortPassword.isValid).toBe(false);
      
      const validPassword = await validator.validateField('password', 'password123', {
        fieldId: 'password',
        fieldValue: 'password123',
        formData: {},
        fieldConfiguration: { minLength: 8 },
        dependencies: {}
      });
      
      expect(validPassword.isValid).toBe(true);
    });

    it('should validate multiple fields', async () => {
      const fields = [
        { fieldId: 'email', value: 'test@example.com', context: { fieldId: 'email', fieldValue: 'test@example.com', formData: {}, fieldConfiguration: {}, dependencies: {} } },
        { fieldId: 'password', value: 'password123', context: { fieldId: 'password', fieldValue: 'password123', formData: {}, fieldConfiguration: { minLength: 8 }, dependencies: {} } }
      ];
      
      const results = await validator.validateFields(fields);
      expect(results).toHaveProperty('email');
      expect(results).toHaveProperty('password');
    });

    it('should validate entire form', async () => {
      const formData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John'
      };
      
      const result = await validator.validateForm(formData);
      expect(result).toHaveProperty('isValid');
      expect(result).toHaveProperty('fieldResults');
      expect(result).toHaveProperty('globalErrors');
      expect(result).toHaveProperty('globalWarnings');
    });
  });

  describe('Field Renderer Tests', () => {
    it('should render field as HTML', () => {
      const field = factory.createFieldInstance('email', {
        placeholder: 'Enter email',
        required: true
      });
      
      expect(field).toBeDefined();
      
      const html = renderer.renderField(field!);
      expect(html).toContain('input');
      expect(html).toContain('email');
      expect(html).toContain('placeholder="Enter email"');
    });

    it('should render multiple fields', () => {
      const fields = [
        factory.createFieldInstance('email')!,
        factory.createFieldInstance('password')!,
        factory.createFieldInstance('firstName')!
      ];
      
      const html = renderer.renderFields(fields);
      expect(html).toContain('input');
      expect(html).toContain('email');
      expect(html).toContain('password');
      expect(html).toContain('firstName');
    });

    it('should render React components', () => {
      const field = factory.createFieldInstance('email');
      expect(field).toBeDefined();
      
      const jsx = renderer.renderReactComponent(field!);
      expect(jsx).toContain('EmailInput');
      expect(jsx).toContain('placeholder');
    });

    it('should render Vue components', () => {
      const field = factory.createFieldInstance('email');
      expect(field).toBeDefined();
      
      const vue = renderer.renderVueComponent(field!);
      expect(vue).toContain('EmailInput');
      expect(vue).toContain('v-model');
    });

    it('should render Angular components', () => {
      const field = factory.createFieldInstance('email');
      expect(field).toBeDefined();
      
      const angular = renderer.renderAngularComponent(field!);
      expect(angular).toContain('EmailInput');
      expect(angular).toContain('[(ngModel)]');
    });
  });

  describe('Field Categories Tests', () => {
    it('should have text-based fields', () => {
      const textFields = registry.getFieldsByCategory('text-based');
      expect(textFields.length).toBeGreaterThan(0);
      
      const fieldIds = textFields.map(f => f.id);
      expect(fieldIds).toContain('email');
      expect(fieldIds).toContain('password');
      expect(fieldIds).toContain('firstName');
    });

    it('should have numeric fields', () => {
      const numericFields = registry.getFieldsByCategory('numeric');
      expect(numericFields.length).toBeGreaterThan(0);
      
      const fieldIds = numericFields.map(f => f.id);
      expect(fieldIds).toContain('number');
      expect(fieldIds).toContain('currency');
      expect(fieldIds).toContain('percentage');
    });

    it('should have selection fields', () => {
      const selectionFields = registry.getFieldsByCategory('selection-choice');
      expect(selectionFields.length).toBeGreaterThan(0);
      
      const fieldIds = selectionFields.map(f => f.id);
      expect(fieldIds).toContain('radio');
      expect(fieldIds).toContain('dropdown');
      expect(fieldIds).toContain('checkbox');
    });

    it('should have date-time fields', () => {
      const dateTimeFields = registry.getFieldsByCategory('date-time');
      expect(dateTimeFields.length).toBeGreaterThan(0);
      
      const fieldIds = dateTimeFields.map(f => f.id);
      expect(fieldIds).toContain('date');
      expect(fieldIds).toContain('time');
      expect(fieldIds).toContain('datetime');
    });

    it('should have healthcare fields', () => {
      const healthcareFields = registry.getFieldsByCategory('healthcare');
      expect(healthcareFields.length).toBeGreaterThan(0);
      
      const fieldIds = healthcareFields.map(f => f.id);
      expect(fieldIds).toContain('bloodPressure');
      expect(fieldIds).toContain('pulseRate');
      expect(fieldIds).toContain('bloodType');
    });

    it('should have business fields', () => {
      const businessFields = registry.getFieldsByCategory('business-professional');
      expect(businessFields.length).toBeGreaterThan(0);
      
      const fieldIds = businessFields.map(f => f.id);
      expect(fieldIds).toContain('companySize');
      expect(fieldIds).toContain('industry');
      expect(fieldIds).toContain('jobTitle');
    });
  });

  describe('Field Helpers Tests', () => {
    it('should get field display name', () => {
      const field = factory.createFieldInstance('email');
      expect(field).toBeDefined();
      
      const displayName = FieldHelpers.getDisplayName(field!);
      expect(displayName).toBe('Email');
    });

    it('should get field description', () => {
      const field = factory.createFieldInstance('email');
      expect(field).toBeDefined();
      
      const description = FieldHelpers.getDescription(field!);
      expect(description).toContain('email');
    });

    it('should check if field is required', () => {
      const requiredField = factory.createFieldInstance('email', { required: true });
      const optionalField = factory.createFieldInstance('email', { required: false });
      
      expect(FieldHelpers.isRequired(requiredField!)).toBe(true);
      expect(FieldHelpers.isRequired(optionalField!)).toBe(false);
    });

    it('should get field value and set field value', () => {
      const field = factory.createFieldInstance('email');
      expect(field).toBeDefined();
      
      FieldHelpers.setValue(field!, 'test@example.com');
      expect(FieldHelpers.getValue(field!)).toBe('test@example.com');
    });

    it('should check if field is empty', () => {
      const emptyField = factory.createFieldInstance('email');
      const filledField = factory.createFieldInstance('email');
      
      FieldHelpers.setValue(filledField!, 'test@example.com');
      
      expect(FieldHelpers.isEmpty(emptyField!)).toBe(true);
      expect(FieldHelpers.isEmpty(filledField!)).toBe(false);
    });

    it('should clone field', () => {
      const originalField = factory.createFieldInstance('email');
      expect(originalField).toBeDefined();
      
      const clonedField = FieldHelpers.cloneField(originalField!, 'cloned-email');
      expect(clonedField.id).toBe('cloned-email');
      expect(clonedField.definition.id).toBe(originalField?.definition.id);
    });
  });

  describe('Validation Helpers Tests', () => {
    it('should create validation results', () => {
      const result = ValidationHelpers.createValidationResult(
        false,
        'Invalid email format',
        'error'
      );
      
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid email format');
      expect(result.severity).toBe('error');
    });

    it('should create validation rules', () => {
      const rule = ValidationHelpers.createValidationRule(
        'email-required',
        'required',
        'Email is required',
        undefined,
        true,
        1
      );
      
      expect(rule.id).toBe('email-required');
      expect(rule.type).toBe('required');
      expect(rule.message).toBe('Email is required');
      expect(rule.enabled).toBe(true);
      expect(rule.priority).toBe(1);
    });

    it('should validate email format', () => {
      const validResult = ValidationHelpers.validateEmail('test@example.com');
      const invalidResult = ValidationHelpers.validateEmail('invalid-email');
      
      expect(validResult.isValid).toBe(true);
      expect(invalidResult.isValid).toBe(false);
    });

    it('should validate required fields', () => {
      const emptyResult = ValidationHelpers.validateRequired('');
      const filledResult = ValidationHelpers.validateRequired('value');
      
      expect(emptyResult.isValid).toBe(false);
      expect(filledResult.isValid).toBe(true);
    });

    it('should validate min/max length', () => {
      const shortResult = ValidationHelpers.validateMinLength('hi', 5);
      const longResult = ValidationHelpers.validateMaxLength('very long text', 5);
      
      expect(shortResult.isValid).toBe(false);
      expect(longResult.isValid).toBe(false);
    });
  });

  describe('Configuration Helpers Tests', () => {
    it('should create configuration options', () => {
      const option = ConfigurationHelpers.createConfigurationOption(
        'placeholder',
        'string',
        'Enter value',
        'Placeholder text',
        undefined,
        false
      );
      
      expect(option.key).toBe('placeholder');
      expect(option.type).toBe('string');
      expect(option.defaultValue).toBe('Enter value');
      expect(option.description).toBe('Placeholder text');
    });

    it('should validate configuration', () => {
      const config = { placeholder: 'Enter email', required: true };
      const schema = {
        placeholder: ConfigurationHelpers.createConfigurationOption('placeholder', 'string', '', ''),
        required: ConfigurationHelpers.createConfigurationOption('required', 'boolean', false, '')
      };
      
      const result = ConfigurationHelpers.validateConfiguration(config, schema);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should merge configurations', () => {
      const base = { placeholder: 'Enter value', required: false };
      const override = { required: true, maxLength: 100 };
      
      const merged = ConfigurationHelpers.mergeConfigurations(base, override);
      expect(merged.placeholder).toBe('Enter value');
      expect(merged.required).toBe(true);
      expect(merged.maxLength).toBe(100);
    });

    it('should create presets', () => {
      const preset = ConfigurationHelpers.createPreset(
        'email-basic',
        'Basic Email Field',
        'Standard email field configuration',
        'text-based',
        { placeholder: 'Enter email', required: true },
        ['form', 'contact']
      );
      
      expect(preset.id).toBe('email-basic');
      expect(preset.name).toBe('Basic Email Field');
      expect(preset.category).toBe('text-based');
      expect(preset.configuration.required).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    it('should create a complete form with multiple field types', () => {
      const formFields = [
        factory.createFieldInstance('firstName', { required: true }),
        factory.createFieldInstance('lastName', { required: true }),
        factory.createFieldInstance('email', { required: true }),
        factory.createFieldInstance('phone', { required: false }),
        factory.createFieldInstance('date', { required: true }),
        factory.createFieldInstance('companySize', { required: false }),
        factory.createFieldInstance('bloodType', { required: false })
      ].filter(field => field !== null) as FieldInstance[];
      
      expect(formFields).toHaveLength(7);
      
      // Render the form
      const formHTML = renderer.renderFields(formFields);
      expect(formHTML).toContain('firstName');
      expect(formHTML).toContain('email');
      expect(formHTML).toContain('date');
    });

    it('should validate a complete form', async () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        date: '2024-01-01'
      };
      
      const result = await validator.validateForm(formData);
      expect(result).toHaveProperty('isValid');
      expect(result).toHaveProperty('fieldResults');
    });

    it('should handle field dependencies', () => {
      const dependentField = factory.createConditionalField(
        'lastName',
        {
          field: 'firstName',
          operator: 'notEquals',
          value: ''
        },
        { required: true }
      );
      
      expect(dependentField).toBeDefined();
      expect(dependentField?.definition.dependencies).toBeDefined();
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle invalid field IDs gracefully', () => {
      const invalidField = factory.createFieldInstance('non-existent-field');
      expect(invalidField).toBeNull();
    });

    it('should handle validation errors gracefully', async () => {
      const result = await validator.validateField('email', 'invalid-email', {
        fieldId: 'email',
        fieldValue: 'invalid-email',
        formData: {},
        fieldConfiguration: { type: 'email' },
        dependencies: {}
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle rendering errors gracefully', () => {
      const field = factory.createFieldInstance('email');
      expect(field).toBeDefined();
      
      // Should not throw error even with invalid options
      expect(() => {
        renderer.renderField(field!, { theme: 'invalid-theme' as any });
      }).not.toThrow();
    });
  });
});
