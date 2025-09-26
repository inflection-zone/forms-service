/**
 * Validation Engine - Comprehensive validation for all field types
 */

import { 
  ValidationContext, 
  ValidationRule,
  ValidationResult,
  ValidationType,
  BuiltInValidators,
  DEFAULT_VALIDATION_MESSAGES
} from '../types/validation.types';
import {
  FieldInstance,
  FieldValidationResult
} from '../types/field.types';

export class ValidationEngine {
  private customValidators: Map<string, ValidationRule> = new Map();
  private builtInValidators: BuiltInValidators;

  constructor() {
    this.builtInValidators = this.initializeBuiltInValidators();
  }

  /**
   * Validate a single field
   */
  public async validateField(
    fieldId: string, 
    value: any, 
    context: ValidationContext
  ): Promise<FieldValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let isValid = true;

    // Get field definition from context
    const fieldDefinition = context.fieldConfiguration;
    
    // Run built-in validations
    const builtInResult = await this.runBuiltInValidations(value, fieldDefinition);
    errors.push(...builtInResult.errors);
    warnings.push(...builtInResult.warnings);
    isValid = isValid && builtInResult.isValid;

    // Run custom validations
    const customResult = await this.runCustomValidations(fieldId, value, context);
    errors.push(...customResult.errors);
    warnings.push(...customResult.warnings);
    isValid = isValid && customResult.isValid;

    // Run field-specific validations
    const fieldSpecificResult = await this.runFieldSpecificValidations(fieldId, value, context);
    errors.push(...fieldSpecificResult.errors);
    warnings.push(...fieldSpecificResult.warnings);
    isValid = isValid && fieldSpecificResult.isValid;

    return {
      isValid,
      errors,
      warnings,
      value,
      transformedValue: this.transformValue(value, fieldDefinition)
    };
  }

  /**
   * Validate multiple fields
   */
  public async validateFields(
    fields: Array<{ fieldId: string; value: any; context: ValidationContext }>
  ): Promise<Record<string, FieldValidationResult>> {
    const results: Record<string, FieldValidationResult> = {};

    for (const field of fields) {
      results[field.fieldId] = await this.validateField(
        field.fieldId, 
        field.value, 
        field.context
      );
    }

    return results;
  }

  /**
   * Validate a form
   */
  public async validateForm(formData: Record<string, any>): Promise<{
    isValid: boolean;
    fieldResults: Record<string, FieldValidationResult>;
    globalErrors: string[];
    globalWarnings: string[];
  }> {
    const fieldResults: Record<string, FieldValidationResult> = {};
    const globalErrors: string[] = [];
    const globalWarnings: string[] = [];

    // Validate each field
    for (const [fieldId, value] of Object.entries(formData)) {
      const context: ValidationContext = {
        fieldId,
        fieldValue: value,
        formData,
        fieldConfiguration: {},
        dependencies: {}
      };

      fieldResults[fieldId] = await this.validateField(fieldId, value, context);
    }

    // Check for global validation rules
    const globalValidationResult = await this.runGlobalValidations(formData);
    globalErrors.push(...globalValidationResult.errors);
    globalWarnings.push(...globalValidationResult.warnings);

    const isValid = Object.values(fieldResults).every(result => result.isValid) && 
                   globalErrors.length === 0;

    return {
      isValid,
      fieldResults,
      globalErrors,
      globalWarnings
    };
  }

  /**
   * Add a custom validator
   */
  public addCustomValidator(rule: ValidationRule): void {
    this.customValidators.set(rule.id, rule);
  }

  /**
   * Remove a custom validator
   */
  public removeCustomValidator(ruleId: string): void {
    this.customValidators.delete(ruleId);
  }

  /**
   * Get all custom validators
   */
  public getCustomValidators(): ValidationRule[] {
    return Array.from(this.customValidators.values());
  }

  /**
   * Run built-in validations
   */
  private async runBuiltInValidations(
    value: any, 
    fieldConfiguration: Record<string, any>
  ): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required validation
    if (fieldConfiguration.required && this.isEmpty(value)) {
      errors.push(DEFAULT_VALIDATION_MESSAGES.required);
    }

    // Skip other validations if value is empty and not required
    if (this.isEmpty(value) && !fieldConfiguration.required) {
      return { isValid: true, message: 'Validation passed', severity: 'info', errors, warnings };
    }

    // Type-specific validations
    if (fieldConfiguration.type === 'email' && !this.builtInValidators.email(value)) {
      errors.push(DEFAULT_VALIDATION_MESSAGES.email);
    }

    if (fieldConfiguration.type === 'url' && !this.builtInValidators.url(value)) {
      errors.push(DEFAULT_VALIDATION_MESSAGES.url);
    }

    if (fieldConfiguration.type === 'phone' && !this.builtInValidators.phone(value)) {
      errors.push(DEFAULT_VALIDATION_MESSAGES.phone);
    }

    if (fieldConfiguration.type === 'number' && !this.builtInValidators.number(value)) {
      errors.push(DEFAULT_VALIDATION_MESSAGES.number);
    }

    if (fieldConfiguration.type === 'date' && !this.builtInValidators.date(value)) {
      errors.push(DEFAULT_VALIDATION_MESSAGES.date);
    }

    // Length validations
    if (typeof value === 'string') {
      if (fieldConfiguration.minLength && !this.builtInValidators.minLength(value, fieldConfiguration.minLength)) {
        errors.push(DEFAULT_VALIDATION_MESSAGES.minLength.replace('{min}', fieldConfiguration.minLength.toString()));
      }

      if (fieldConfiguration.maxLength && !this.builtInValidators.maxLength(value, fieldConfiguration.maxLength)) {
        errors.push(DEFAULT_VALIDATION_MESSAGES.maxLength.replace('{max}', fieldConfiguration.maxLength.toString()));
      }

      if (fieldConfiguration.pattern && !this.builtInValidators.pattern(value, new RegExp(fieldConfiguration.pattern))) {
        errors.push(DEFAULT_VALIDATION_MESSAGES.pattern);
      }
    }

    // Numeric validations
    if (typeof value === 'number') {
      if (fieldConfiguration.min !== undefined && !this.builtInValidators.min(value, fieldConfiguration.min)) {
        errors.push(DEFAULT_VALIDATION_MESSAGES.min.replace('{min}', fieldConfiguration.min.toString()));
      }

      if (fieldConfiguration.max !== undefined && !this.builtInValidators.max(value, fieldConfiguration.max)) {
        errors.push(DEFAULT_VALIDATION_MESSAGES.max.replace('{max}', fieldConfiguration.max.toString()));
      }
    }

    // File validations
    if (value instanceof File) {
      if (fieldConfiguration.maxSize && !this.builtInValidators.fileSize(value, fieldConfiguration.maxSize)) {
        errors.push(DEFAULT_VALIDATION_MESSAGES.fileSize.replace('{maxSize}', fieldConfiguration.maxSize.toString()));
      }

      if (fieldConfiguration.allowedTypes && !this.builtInValidators.fileType(value, fieldConfiguration.allowedTypes)) {
        errors.push(DEFAULT_VALIDATION_MESSAGES.fileType.replace('{allowedTypes}', fieldConfiguration.allowedTypes.join(', ')));
      }
    }

    return {
      isValid: errors.length === 0,
      message: errors.length === 0 ? 'Validation passed' : 'Validation failed',
      severity: errors.length === 0 ? 'info' : 'error',
      errors,
      warnings
    };
  }

  /**
   * Run custom validations
   */
  private async runCustomValidations(
    fieldId: string,
    value: any,
    context: ValidationContext
  ): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const rule of Array.from(this.customValidators.values())) {
      if (rule.enabled) {
        try {
          let result: ValidationResult;
          
          if (rule.customValidator) {
            result = await rule.customValidator(context);
          } else {
            result = await this.runBuiltInValidation(rule.type, value, rule.value, context);
          }

          if (!result.isValid) {
            if (result.severity === 'error') {
              errors.push(result.message);
            } else if (result.severity === 'warning') {
              warnings.push(result.message);
            }
          }
        } catch (error) {
          console.error(`Custom validation error for field ${fieldId}:`, error);
          errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      message: errors.length === 0 ? 'Validation passed' : 'Validation failed',
      severity: errors.length === 0 ? 'info' : 'error',
      errors,
      warnings
    };
  }

  /**
   * Run field-specific validations
   */
  private async runFieldSpecificValidations(
    fieldId: string,
    value: any,
    context: ValidationContext
  ): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Field-specific validation logic based on field type
    const fieldType = context.fieldConfiguration.type;

    switch (fieldType) {
      case 'email':
        if (value && !this.isValidEmail(value)) {
          errors.push('Please enter a valid email address');
        }
        break;

      case 'phone':
        if (value && !this.isValidPhone(value)) {
          errors.push('Please enter a valid phone number');
        }
        break;

      case 'url':
        if (value && !this.isValidUrl(value)) {
          errors.push('Please enter a valid URL');
        }
        break;

      case 'currency':
        if (value && !this.isValidCurrency(value)) {
          errors.push('Please enter a valid currency amount');
        }
        break;

      case 'percentage':
        if (value && !this.isValidPercentage(value)) {
          errors.push('Please enter a valid percentage (0-100)');
        }
        break;

      case 'zipCode':
        if (value && !this.isValidZipCode(value)) {
          errors.push('Please enter a valid ZIP code');
        }
        break;

      default:
        // No specific validation
        break;
    }

    return {
      isValid: errors.length === 0,
      message: errors.length === 0 ? 'Validation passed' : 'Validation failed',
      severity: errors.length === 0 ? 'info' : 'error',
      errors,
      warnings
    };
  }

  /**
   * Run global validations
   */
  private async runGlobalValidations(formData: Record<string, any>): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Example: Check for duplicate values
    const values = Object.values(formData);
    const duplicates = values.filter((value, index) => 
      values.indexOf(value) !== index && value !== null && value !== undefined && value !== ''
    );

    if (duplicates.length > 0) {
      warnings.push('Some fields have duplicate values');
    }

    return {
      isValid: errors.length === 0,
      message: errors.length === 0 ? 'Validation passed' : 'Validation failed',
      severity: errors.length === 0 ? 'info' : 'error',
      errors,
      warnings
    };
  }

  /**
   * Run a built-in validation
   */
  private async runBuiltInValidation(
    type: ValidationType,
    value: any,
    ruleValue: any,
    context: ValidationContext
  ): Promise<ValidationResult> {
    let isValid = false;
    let message = '';

    switch (type) {
      case 'required':
        isValid = this.builtInValidators.required(value);
        message = DEFAULT_VALIDATION_MESSAGES.required;
        break;

      case 'minLength':
        isValid = this.builtInValidators.minLength(value, ruleValue);
        message = DEFAULT_VALIDATION_MESSAGES.minLength.replace('{min}', ruleValue.toString());
        break;

      case 'maxLength':
        isValid = this.builtInValidators.maxLength(value, ruleValue);
        message = DEFAULT_VALIDATION_MESSAGES.maxLength.replace('{max}', ruleValue.toString());
        break;

      case 'pattern':
        isValid = this.builtInValidators.pattern(value, new RegExp(ruleValue));
        message = DEFAULT_VALIDATION_MESSAGES.pattern;
        break;

      case 'min':
        isValid = this.builtInValidators.min(value, ruleValue);
        message = DEFAULT_VALIDATION_MESSAGES.min.replace('{min}', ruleValue.toString());
        break;

      case 'max':
        isValid = this.builtInValidators.max(value, ruleValue);
        message = DEFAULT_VALIDATION_MESSAGES.max.replace('{max}', ruleValue.toString());
        break;

      case 'email':
        isValid = this.builtInValidators.email(value);
        message = DEFAULT_VALIDATION_MESSAGES.email;
        break;

      case 'url':
        isValid = this.builtInValidators.url(value);
        message = DEFAULT_VALIDATION_MESSAGES.url;
        break;

      case 'phone':
        isValid = this.builtInValidators.phone(value);
        message = DEFAULT_VALIDATION_MESSAGES.phone;
        break;

      case 'date':
        isValid = this.builtInValidators.date(value);
        message = DEFAULT_VALIDATION_MESSAGES.date;
        break;

      case 'number':
        isValid = this.builtInValidators.number(value);
        message = DEFAULT_VALIDATION_MESSAGES.number;
        break;

      case 'fileSize':
        isValid = this.builtInValidators.fileSize(value, ruleValue);
        message = DEFAULT_VALIDATION_MESSAGES.fileSize.replace('{maxSize}', ruleValue.toString());
        break;

      case 'fileType':
        isValid = this.builtInValidators.fileType(value, ruleValue);
        message = DEFAULT_VALIDATION_MESSAGES.fileType.replace('{allowedTypes}', ruleValue.join(', '));
        break;

      default:
        isValid = true;
        message = 'Validation passed';
    }

    return {
      isValid,
      message,
      severity: isValid ? 'info' : 'error'
    };
  }

  /**
   * Transform value based on field configuration
   */
  private transformValue(value: any, fieldConfiguration: Record<string, any>): any {
    if (value === null || value === undefined) {
      return value;
    }

    const fieldType = fieldConfiguration.type;

    switch (fieldType) {
      case 'number':
      case 'currency':
      case 'percentage':
        return typeof value === 'string' ? parseFloat(value) : value;

      case 'date':
        return value instanceof Date ? value : new Date(value);

      case 'boolean':
        return Boolean(value);

      case 'array':
        return Array.isArray(value) ? value : [value];

      default:
        return value;
    }
  }

  /**
   * Check if value is empty
   */
  private isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  /**
   * Initialize built-in validators
   */
  private initializeBuiltInValidators(): BuiltInValidators {
    return {
      required: (value: any) => !this.isEmpty(value),
      minLength: (value: string, min: number) => value.length >= min,
      maxLength: (value: string, max: number) => value.length <= max,
      pattern: (value: string, regex: RegExp) => regex.test(value),
      min: (value: number, min: number) => value >= min,
      max: (value: number, max: number) => value <= max,
      email: (value: string) => this.isValidEmail(value),
      url: (value: string) => this.isValidUrl(value),
      phone: (value: string) => this.isValidPhone(value),
      date: (value: string | Date) => this.isValidDate(value),
      number: (value: any) => !isNaN(Number(value)),
      fileSize: (file: File, maxSize: number) => file.size <= maxSize,
      fileType: (file: File, allowedTypes: string[]) => allowedTypes.includes(file.type)
    };
  }

  // Field-specific validation methods
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private isValidCurrency(amount: any): boolean {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return !isNaN(num) && num >= 0;
  }

  private isValidPercentage(value: any): boolean {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(num) && num >= 0 && num <= 100;
  }

  private isValidZipCode(zipCode: string): boolean {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  }

  private isValidDate(date: string | Date): boolean {
    const d = date instanceof Date ? date : new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  }
}
