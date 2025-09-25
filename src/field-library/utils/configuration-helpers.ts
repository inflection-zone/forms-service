/**
 * Configuration helper utilities
 */

import { 
  ConfigurationOption, 
  ConfigurationType, 
  FieldConfiguration, 
  ConfigurationSchema,
  ConfigurationValidationResult,
  ConfigurationPreset,
  ConfigurationTemplate
} from '../types/configuration.types';

export class ConfigurationHelpers {
  /**
   * Create a configuration option
   */
  public static createConfigurationOption(
    key: string,
    type: ConfigurationType,
    defaultValue: any,
    description: string,
    options?: any[],
    required: boolean = false,
    min?: number,
    max?: number,
    step?: number
  ): ConfigurationOption {
    return {
      key,
      type,
      defaultValue,
      description,
      options,
      required,
      min,
      max,
      step
    };
  }

  /**
   * Create a configuration schema
   */
  public static createConfigurationSchema(options: ConfigurationOption[]): ConfigurationSchema {
    const schema: ConfigurationSchema = {};
    options.forEach(option => {
      schema[option.key] = option;
    });
    return schema;
  }

  /**
   * Validate configuration against schema
   */
  public static validateConfiguration(
    config: FieldConfiguration,
    schema: ConfigurationSchema
  ): ConfigurationValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const sanitizedConfig: FieldConfiguration = {};

    // Validate each configuration option
    Object.entries(schema).forEach(([key, option]) => {
      const value = config[key];

      // Check required fields
      if (option.required && (value === undefined || value === null)) {
        errors.push(`${key} is required`);
        return;
      }

      // Skip validation if value is not provided and not required
      if (value === undefined || value === null) {
        sanitizedConfig[key] = option.defaultValue;
        return;
      }

      // Type validation
      const typeValidation = this.validateType(value, option.type);
      if (!typeValidation.isValid) {
        errors.push(`${key}: ${typeValidation.message}`);
        return;
      }

      // Range validation for numbers
      if (option.type === 'number' && typeof value === 'number') {
        if (option.min !== undefined && value < option.min) {
          errors.push(`${key} must be at least ${option.min}`);
          return;
        }
        if (option.max !== undefined && value > option.max) {
          errors.push(`${key} must be no more than ${option.max}`);
          return;
        }
      }

      // Options validation
      if (option.options && !option.options.includes(value)) {
        errors.push(`${key} must be one of: ${option.options.join(', ')}`);
        return;
      }

      // Sanitize value
      sanitizedConfig[key] = this.sanitizeValue(value, option.type);
    });

    // Check for unknown configuration keys
    Object.keys(config).forEach(key => {
      if (!schema[key]) {
        warnings.push(`Unknown configuration key: ${key}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitizedConfig
    };
  }

  /**
   * Validate value type
   */
  private static validateType(value: any, type: ConfigurationType): { isValid: boolean; message: string } {
    switch (type) {
      case 'string':
        return { isValid: typeof value === 'string', message: 'Must be a string' };
      case 'number':
        return { isValid: typeof value === 'number' && !isNaN(value), message: 'Must be a number' };
      case 'boolean':
        return { isValid: typeof value === 'boolean', message: 'Must be a boolean' };
      case 'array':
        return { isValid: Array.isArray(value), message: 'Must be an array' };
      case 'object':
        return { isValid: typeof value === 'object' && value !== null, message: 'Must be an object' };
      case 'select':
        return { isValid: typeof value === 'string' || typeof value === 'number', message: 'Must be a string or number' };
      case 'multiselect':
        return { isValid: Array.isArray(value), message: 'Must be an array' };
      case 'range':
        return { 
          isValid: typeof value === 'object' && value !== null && 'min' in value && 'max' in value,
          message: 'Must be an object with min and max properties'
        };
      default:
        return { isValid: true, message: 'Unknown type' };
    }
  }

  /**
   * Sanitize value based on type
   */
  private static sanitizeValue(value: any, type: ConfigurationType): any {
    switch (type) {
      case 'string':
        return String(value);
      case 'number':
        const num = Number(value);
        return isNaN(num) ? 0 : num;
      case 'boolean':
        return Boolean(value);
      case 'array':
        return Array.isArray(value) ? value : [value];
      case 'object':
        return typeof value === 'object' && value !== null ? value : {};
      case 'select':
        return String(value);
      case 'multiselect':
        return Array.isArray(value) ? value : [value];
      case 'range':
        if (typeof value === 'object' && value !== null && 'min' in value && 'max' in value) {
          return value;
        }
        return { min: 0, max: 100 };
      default:
        return value;
    }
  }

  /**
   * Merge configurations
   */
  public static mergeConfigurations(
    baseConfig: FieldConfiguration,
    overrideConfig: FieldConfiguration
  ): FieldConfiguration {
    return { ...baseConfig, ...overrideConfig };
  }

  /**
   * Merge with defaults
   */
  public static mergeWithDefaults(
    config: FieldConfiguration,
    defaults: FieldConfiguration
  ): FieldConfiguration {
    const merged = { ...defaults };
    Object.keys(config).forEach(key => {
      if (config[key] !== undefined) {
        merged[key] = config[key];
      }
    });
    return merged;
  }

  /**
   * Deep merge configurations
   */
  public static deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    });
    
    return result;
  }

  /**
   * Create a configuration preset
   */
  public static createPreset(
    id: string,
    name: string,
    description: string,
    category: string,
    configuration: FieldConfiguration,
    tags: string[] = []
  ): ConfigurationPreset {
    return {
      id,
      name,
      description,
      category,
      configuration,
      tags
    };
  }

  /**
   * Create a configuration template
   */
  public static createTemplate(
    id: string,
    name: string,
    description: string,
    category: string,
    schema: ConfigurationSchema,
    defaultValues: FieldConfiguration,
    presets: ConfigurationPreset[] = []
  ): ConfigurationTemplate {
    return {
      id,
      name,
      description,
      category,
      schema,
      defaultValues,
      presets
    };
  }

  /**
   * Get configuration value with fallback
   */
  public static getConfigValue(
    config: FieldConfiguration,
    key: string,
    fallback?: any
  ): any {
    return config[key] !== undefined ? config[key] : fallback;
  }

  /**
   * Set configuration value
   */
  public static setConfigValue(
    config: FieldConfiguration,
    key: string,
    value: any
  ): void {
    config[key] = value;
  }

  /**
   * Remove configuration value
   */
  public static removeConfigValue(
    config: FieldConfiguration,
    key: string
  ): void {
    delete config[key];
  }

  /**
   * Check if configuration has key
   */
  public static hasConfigKey(
    config: FieldConfiguration,
    key: string
  ): boolean {
    return key in config;
  }

  /**
   * Get configuration keys
   */
  public static getConfigKeys(config: FieldConfiguration): string[] {
    return Object.keys(config);
  }

  /**
   * Get configuration values
   */
  public static getConfigValues(config: FieldConfiguration): any[] {
    return Object.values(config);
  }

  /**
   * Get configuration entries
   */
  public static getConfigEntries(config: FieldConfiguration): Array<[string, any]> {
    return Object.entries(config);
  }

  /**
   * Clone configuration
   */
  public static cloneConfiguration(config: FieldConfiguration): FieldConfiguration {
    return JSON.parse(JSON.stringify(config));
  }

  /**
   * Clear configuration
   */
  public static clearConfiguration(config: FieldConfiguration): void {
    Object.keys(config).forEach(key => {
      delete config[key];
    });
  }

  /**
   * Filter configuration by keys
   */
  public static filterConfiguration(
    config: FieldConfiguration,
    keys: string[]
  ): FieldConfiguration {
    const filtered: FieldConfiguration = {};
    keys.forEach(key => {
      if (key in config) {
        filtered[key] = config[key];
      }
    });
    return filtered;
  }

  /**
   * Exclude configuration keys
   */
  public static excludeConfiguration(
    config: FieldConfiguration,
    keys: string[]
  ): FieldConfiguration {
    const filtered: FieldConfiguration = {};
    Object.keys(config).forEach(key => {
      if (!keys.includes(key)) {
        filtered[key] = config[key];
      }
    });
    return filtered;
  }

  /**
   * Transform configuration values
   */
  public static transformConfiguration(
    config: FieldConfiguration,
    transformer: (key: string, value: any) => any
  ): FieldConfiguration {
    const transformed: FieldConfiguration = {};
    Object.entries(config).forEach(([key, value]) => {
      transformed[key] = transformer(key, value);
    });
    return transformed;
  }

  /**
   * Validate configuration completeness
   */
  public static validateCompleteness(
    config: FieldConfiguration,
    schema: ConfigurationSchema
  ): { isComplete: boolean; missingKeys: string[] } {
    const missingKeys: string[] = [];
    
    Object.entries(schema).forEach(([key, option]) => {
      if (option.required && !(key in config)) {
        missingKeys.push(key);
      }
    });

    return {
      isComplete: missingKeys.length === 0,
      missingKeys
    };
  }

  /**
   * Get configuration summary
   */
  public static getConfigurationSummary(config: FieldConfiguration): {
    totalKeys: number;
    keys: string[];
    types: Record<string, string>;
    values: Record<string, any>;
  } {
    const keys = Object.keys(config);
    const types: Record<string, string> = {};
    const values: Record<string, any> = {};

    keys.forEach(key => {
      types[key] = typeof config[key];
      values[key] = config[key];
    });

    return {
      totalKeys: keys.length,
      keys,
      types,
      values
    };
  }

  /**
   * Serialize configuration
   */
  public static serializeConfiguration(config: FieldConfiguration): string {
    return JSON.stringify(config, null, 2);
  }

  /**
   * Deserialize configuration
   */
  public static deserializeConfiguration(serialized: string): FieldConfiguration {
    try {
      return JSON.parse(serialized);
    } catch (error) {
      throw new Error(`Failed to deserialize configuration: ${error}`);
    }
  }

  /**
   * Validate serialized configuration
   */
  public static validateSerializedConfiguration(serialized: string): boolean {
    try {
      JSON.parse(serialized);
      return true;
    } catch {
      return false;
    }
  }
}
