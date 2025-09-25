/**
 * Configuration types for field customization and settings
 */

import { ConfigurationType, ConfigurationOption } from './field.types';

export interface FieldConfiguration {
  [key: string]: any;
}

export interface ConfigurationSchema {
  [key: string]: ConfigurationOption;
}

export interface ConfigurationValidator {
  validate(config: FieldConfiguration, schema: ConfigurationSchema): ConfigurationValidationResult;
}

export interface ConfigurationValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  sanitizedConfig: FieldConfiguration;
}

export interface ConfigurationPreset {
  id: string;
  name: string;
  description: string;
  category: string;
  configuration: FieldConfiguration;
  tags: string[];
}

export interface ConfigurationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  schema: ConfigurationSchema;
  defaultValues: FieldConfiguration;
  presets: ConfigurationPreset[];
}

export interface ConfigurationManager {
  getConfiguration(fieldId: string): FieldConfiguration;
  setConfiguration(fieldId: string, config: FieldConfiguration): void;
  resetConfiguration(fieldId: string): void;
  validateConfiguration(fieldId: string, config: FieldConfiguration): ConfigurationValidationResult;
  applyPreset(fieldId: string, presetId: string): void;
  createPreset(fieldId: string, name: string, description: string): ConfigurationPreset;
  getAvailablePresets(category: string): ConfigurationPreset[];
}

export interface ConfigurationOptionBuilder {
  addStringOption(key: string, defaultValue: string, description: string, options?: any[]): ConfigurationOptionBuilder;
  addNumberOption(key: string, defaultValue: number, description: string, min?: number, max?: number, step?: number): ConfigurationOptionBuilder;
  addBooleanOption(key: string, defaultValue: boolean, description: string): ConfigurationOptionBuilder;
  addArrayOption(key: string, defaultValue: any[], description: string, itemType?: ConfigurationType): ConfigurationOptionBuilder;
  addObjectOption(key: string, defaultValue: object, description: string, schema?: any): ConfigurationOptionBuilder;
  addSelectOption(key: string, defaultValue: any, description: string, options: any[]): ConfigurationOptionBuilder;
  addMultiSelectOption(key: string, defaultValue: any[], description: string, options: any[]): ConfigurationOptionBuilder;
  addRangeOption(key: string, defaultValue: { min: number; max: number }, description: string, min?: number, max?: number, step?: number): ConfigurationOptionBuilder;
  build(): ConfigurationOption[];
}

export interface ConfigurationDefaults {
  [fieldType: string]: FieldConfiguration;
}

export const COMMON_CONFIGURATION_OPTIONS: Partial<ConfigurationOption>[] = [
  {
    key: 'placeholder',
    type: 'string',
    defaultValue: '',
    description: 'Placeholder text for the field',
    required: false
  },
  {
    key: 'helpText',
    type: 'string',
    defaultValue: '',
    description: 'Help text displayed below the field',
    required: false
  },
  {
    key: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Whether the field is disabled',
    required: false
  },
  {
    key: 'readonly',
    type: 'boolean',
    defaultValue: false,
    description: 'Whether the field is read-only',
    required: false
  },
  {
    key: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Whether the field is required',
    required: false
  },
  {
    key: 'visible',
    type: 'boolean',
    defaultValue: true,
    description: 'Whether the field is visible',
    required: false
  },
  {
    key: 'className',
    type: 'string',
    defaultValue: '',
    description: 'CSS class name for styling',
    required: false
  },
  {
    key: 'style',
    type: 'object',
    defaultValue: {},
    description: 'Inline CSS styles',
    required: false
  }
];

export interface ConfigurationMerger {
  merge(baseConfig: FieldConfiguration, overrideConfig: FieldConfiguration): FieldConfiguration;
  mergeWithDefaults(config: FieldConfiguration, defaults: FieldConfiguration): FieldConfiguration;
  deepMerge(target: any, source: any): any;
}

export interface ConfigurationSerializer {
  serialize(config: FieldConfiguration): string;
  deserialize(serialized: string): FieldConfiguration;
  validateSerialized(serialized: string): boolean;
}
