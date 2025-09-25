/**
 * Validation types and utilities for field validation
 */

import { ValidationOption, FieldValidationResult } from './field.types';

export type ValidationType = 
  | 'required'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'min'
  | 'max'
  | 'fileSize'
  | 'fileType'
  | 'email'
  | 'url'
  | 'phone'
  | 'date'
  | 'number'
  | 'custom';

export interface ValidationContext {
  fieldId: string;
  fieldValue: any;
  formData: Record<string, any>;
  fieldConfiguration: Record<string, any>;
  dependencies: Record<string, any>;
}

export interface ValidationRule {
  id: string;
  type: ValidationType;
  value?: any;
  message: string;
  enabled: boolean;
  priority: number;
  customValidator?: (context: ValidationContext) => Promise<ValidationResult>;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
  code?: string;
  details?: any;
}

export interface ValidationEngine {
  validateField(fieldId: string, value: any, context: ValidationContext): Promise<FieldValidationResult>;
  validateForm(formData: Record<string, any>): Promise<FormValidationResult>;
  addCustomValidator(rule: ValidationRule): void;
  removeCustomValidator(ruleId: string): void;
}

export interface FormValidationResult {
  isValid: boolean;
  fieldResults: Record<string, FieldValidationResult>;
  globalErrors: string[];
  globalWarnings: string[];
}

export interface ValidationOptions {
  stopOnFirstError?: boolean;
  validateDependencies?: boolean;
  asyncValidation?: boolean;
  customValidators?: ValidationRule[];
}

export class ValidationError extends Error {
  constructor(
    public fieldId: string,
    public rule: ValidationRule,
    public context: ValidationContext,
    message?: string
  ) {
    super(message || rule.message);
    this.name = 'ValidationError';
  }
}

export interface BuiltInValidators {
  required: (value: any) => boolean;
  minLength: (value: string, min: number) => boolean;
  maxLength: (value: string, max: number) => boolean;
  pattern: (value: string, regex: RegExp) => boolean;
  min: (value: number, min: number) => boolean;
  max: (value: number, max: number) => boolean;
  email: (value: string) => boolean;
  url: (value: string) => boolean;
  phone: (value: string, country?: string) => boolean;
  date: (value: string | Date) => boolean;
  number: (value: any) => boolean;
  fileSize: (file: File, maxSize: number) => boolean;
  fileType: (file: File, allowedTypes: string[]) => boolean;
}

export interface ValidationMessages {
  required: string;
  minLength: string;
  maxLength: string;
  pattern: string;
  min: string;
  max: string;
  email: string;
  url: string;
  phone: string;
  date: string;
  number: string;
  fileSize: string;
  fileType: string;
  custom: string;
}

export const DEFAULT_VALIDATION_MESSAGES: ValidationMessages = {
  required: 'This field is required',
  minLength: 'Must be at least {min} characters long',
  maxLength: 'Must be no more than {max} characters long',
  pattern: 'Invalid format',
  min: 'Must be at least {min}',
  max: 'Must be no more than {max}',
  email: 'Please enter a valid email address',
  url: 'Please enter a valid URL',
  phone: 'Please enter a valid phone number',
  date: 'Please enter a valid date',
  number: 'Please enter a valid number',
  fileSize: 'File size must be less than {maxSize}',
  fileType: 'File type must be one of: {allowedTypes}',
  custom: 'Validation failed'
};
