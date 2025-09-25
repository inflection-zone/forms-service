/**
 * Field Factory - Factory for creating field instances and components
 */

import { FieldDefinition, FieldInstance, FieldRenderOptions } from '../types/field.types';
import { FieldRegistry } from './field-registry';
import { ValidationEngine } from './validation-engine';

export class FieldFactory {
  private registry: FieldRegistry;
  private validationEngine: ValidationEngine;

  constructor() {
    this.registry = FieldRegistry.getInstance();
    this.validationEngine = new ValidationEngine();
  }

  /**
   * Create a field instance from a field definition ID
   */
  public createFieldInstance(
    fieldId: string, 
    configuration?: Record<string, any>,
    initialValue?: any
  ): FieldInstance | null {
    const definition = this.registry.getField(fieldId);
    if (!definition) {
      throw new Error(`Field definition not found: ${fieldId}`);
    }

    const instance = this.registry.createFieldInstance(fieldId, configuration);
    if (!instance) {
      return null;
    }

    if (initialValue !== undefined) {
      instance.value = initialValue;
    }

    // Apply configuration defaults
    this.applyConfigurationDefaults(instance);

    return instance;
  }

  /**
   * Create multiple field instances
   */
  public createFieldInstances(
    fieldConfigs: Array<{ fieldId: string; configuration?: Record<string, any>; initialValue?: any }>
  ): FieldInstance[] {
    return fieldConfigs
      .map(config => this.createFieldInstance(config.fieldId, config.configuration, config.initialValue))
      .filter((instance): instance is FieldInstance => instance !== null);
  }

  /**
   * Clone a field instance
   */
  public cloneFieldInstance(instance: FieldInstance): FieldInstance {
    return {
      ...instance,
      id: `${instance.definition.id}_${Date.now()}`,
      metadata: {
        ...instance.metadata,
        created: new Date(),
        modified: new Date()
      }
    };
  }

  /**
   * Create a field from a template
   */
  public createFieldFromTemplate(
    templateId: string,
    overrides?: Partial<FieldInstance>
  ): FieldInstance | null {
    // This would typically load from a template system
    // For now, we'll use the registry
    const instance = this.createFieldInstance(templateId);
    if (!instance) return null;

    if (overrides) {
      Object.assign(instance, overrides);
    }

    return instance;
  }

  /**
   * Create a field group (multiple related fields)
   */
  public createFieldGroup(
    groupConfig: {
      name: string;
      fields: Array<{ fieldId: string; configuration?: Record<string, any> }>;
      layout?: 'vertical' | 'horizontal' | 'grid';
      dependencies?: Array<{ from: string; to: string; condition: any }>;
    }
  ): FieldInstance[] {
    const instances = this.createFieldInstances(groupConfig.fields);
    
    // Apply group-level configuration
    instances.forEach(instance => {
      if (groupConfig.layout) {
        instance.configuration.layout = groupConfig.layout;
      }
    });

    // Apply dependencies
    if (groupConfig.dependencies) {
      groupConfig.dependencies.forEach(dep => {
        const fromField = instances.find(f => f.definition.id === dep.from);
        const toField = instances.find(f => f.definition.id === dep.to);
        
        if (fromField && toField) {
          // Set up dependency logic
          toField.configuration.dependsOn = dep.from;
          toField.configuration.dependencyCondition = dep.condition;
        }
      });
    }

    return instances;
  }

  /**
   * Create a conditional field
   */
  public createConditionalField(
    fieldId: string,
    condition: {
      field: string;
      operator: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan';
      value: any;
    },
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    instance.configuration.conditional = condition;
    instance.isVisible = false; // Initially hidden

    return instance;
  }

  /**
   * Create a calculated field
   */
  public createCalculatedField(
    fieldId: string,
    formula: string,
    dependencies: string[],
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    instance.configuration.calculated = true;
    instance.configuration.formula = formula;
    instance.configuration.dependencies = dependencies;
    instance.isEnabled = false; // Read-only

    return instance;
  }

  /**
   * Create a field with validation
   */
  public createFieldWithValidation(
    fieldId: string,
    validationRules: Array<{ type: string; value?: any; message: string }>,
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    // Add custom validation rules
    instance.configuration.customValidation = validationRules;

    return instance;
  }

  /**
   * Create a field with custom styling
   */
  public createStyledField(
    fieldId: string,
    styling: {
      theme?: string;
      size?: string;
      variant?: string;
      className?: string;
      style?: Record<string, any>;
    },
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    instance.configuration.styling = styling;

    return instance;
  }

  /**
   * Create a field with accessibility features
   */
  public createAccessibleField(
    fieldId: string,
    accessibility: {
      ariaLabel?: string;
      ariaDescription?: string;
      keyboardNavigation?: boolean;
      screenReaderSupport?: boolean;
    },
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    instance.configuration.accessibility = {
      ...instance.definition.accessibility,
      ...accessibility
    };

    return instance;
  }

  /**
   * Create a field with internationalization
   */
  public createInternationalizedField(
    fieldId: string,
    i18n: {
      locale: string;
      translations: Record<string, string>;
      dateFormat?: string;
      numberFormat?: string;
    },
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    instance.configuration.i18n = i18n;

    return instance;
  }

  /**
   * Create a field with data binding
   */
  public createDataBoundField(
    fieldId: string,
    dataBinding: {
      dataSource: string;
      keyField: string;
      valueField: string;
      displayField?: string;
    },
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    instance.configuration.dataBinding = dataBinding;

    return instance;
  }

  /**
   * Create a field with real-time validation
   */
  public createRealtimeValidationField(
    fieldId: string,
    validationConfig: {
      validateOnChange?: boolean;
      validateOnBlur?: boolean;
      debounceMs?: number;
      showErrorsImmediately?: boolean;
    },
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    instance.configuration.realtimeValidation = validationConfig;

    return instance;
  }

  /**
   * Create a field with custom render options
   */
  public createCustomRenderedField(
    fieldId: string,
    renderOptions: FieldRenderOptions,
    configuration?: Record<string, any>
  ): FieldInstance | null {
    const instance = this.createFieldInstance(fieldId, configuration);
    if (!instance) return null;

    instance.configuration.renderOptions = renderOptions;

    return instance;
  }

  /**
   * Apply configuration defaults to a field instance
   */
  private applyConfigurationDefaults(instance: FieldInstance): void {
    const { definition } = instance;
    
    definition.configurationOptions.forEach(option => {
      if (instance.configuration[option.key] === undefined) {
        instance.configuration[option.key] = option.defaultValue;
      }
    });
  }

  /**
   * Validate field configuration
   */
  public validateFieldConfiguration(
    fieldId: string,
    configuration: Record<string, any>
  ): { isValid: boolean; errors: string[] } {
    const definition = this.registry.getField(fieldId);
    if (!definition) {
      return { isValid: false, errors: ['Field definition not found'] };
    }

    const errors: string[] = [];

    definition.configurationOptions.forEach(option => {
      const value = configuration[option.key];
      
      if (option.required && (value === undefined || value === null || value === '')) {
        errors.push(`${option.key} is required`);
      }

      if (value !== undefined) {
        // Type validation
        if (option.type === 'number' && typeof value !== 'number') {
          errors.push(`${option.key} must be a number`);
        } else if (option.type === 'boolean' && typeof value !== 'boolean') {
          errors.push(`${option.key} must be a boolean`);
        } else if (option.type === 'array' && !Array.isArray(value)) {
          errors.push(`${option.key} must be an array`);
        } else if (option.type === 'object' && typeof value !== 'object') {
          errors.push(`${option.key} must be an object`);
        }

        // Range validation
        if (option.type === 'number' && typeof value === 'number') {
          if (option.min !== undefined && value < option.min) {
            errors.push(`${option.key} must be at least ${option.min}`);
          }
          if (option.max !== undefined && value > option.max) {
            errors.push(`${option.key} must be no more than ${option.max}`);
          }
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get field factory statistics
   */
  public getStatistics(): {
    totalFieldTypes: number;
    availableCategories: string[];
    supportedResponseTypes: string[];
  } {
    const stats = this.registry.getStatistics();
    return {
      totalFieldTypes: stats.totalFields,
      availableCategories: Array.from(stats.fieldCountByCategory.keys()),
      supportedResponseTypes: stats.responseTypes
    };
  }
}
