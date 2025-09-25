/**
 * Field Library - Comprehensive Form Field Categories & Types
 * 
 * This module provides a complete field library with built-in logic,
 * validation, and schema structures for all major form field types.
 */

// Core interfaces and types
export * from './types/field.types';
export { 
  ValidationContext, 
  ValidationRule as ValidationRuleType, 
  ValidationResult, 
  FormValidationResult, 
  ValidationOptions, 
  ValidationError, 
  BuiltInValidators, 
  ValidationMessages 
} from './types/validation.types';
export { 
  FieldConfiguration as FieldConfig, 
  ConfigurationSchema, 
  ConfigurationValidator, 
  ConfigurationValidationResult, 
  ConfigurationPreset, 
  ConfigurationTemplate, 
  ConfigurationManager, 
  ConfigurationOptionBuilder, 
  ConfigurationDefaults, 
  ConfigurationMerger, 
  ConfigurationSerializer 
} from './types/configuration.types';

// Field categories
export * from './categories/text-fields';
export * from './categories/numeric-fields';
export * from './categories/selection-fields';
export * from './categories/date-time-fields';
export * from './categories/rating-feedback-fields';
export * from './categories/measurement-fields';
export * from './categories/geographic-fields';
export * from './categories/media-fields';
export * from './categories/healthcare-fields';
export * from './categories/business-fields';
export * from './categories/educational-fields';
export * from './categories/ecommerce-fields';
export * from './categories/survey-fields';
export * from './categories/interactive-fields';

// Core services
export * from './services/field-registry';
export * from './services/field-factory';
export { ValidationEngine as ValidationEngineService } from './services/validation-engine';
export * from './services/field-renderer';

// Utilities
export * from './utils/field-helpers';
export * from './utils/validation-helpers';
export * from './utils/configuration-helpers';
