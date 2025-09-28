/**
 * Validation helper utilities
 */

import { ValidationResult, ValidationRule, ValidationType, DEFAULT_VALIDATION_MESSAGES } from '../types/validation.types';

export class ValidationHelpers {
  /**
   * Create a validation result
   */
  public static createValidationResult(
    isValid: boolean,
    message: string,
    severity: 'error' | 'warning' | 'info' = 'error'
  ): ValidationResult {
    return {
      isValid,
      message,
      severity
    };
  }

  /**
   * Create a validation rule
   */
  public static createValidationRule(
    id: string,
    type: ValidationType,
    message: string,
    value?: any,
    enabled: boolean = true,
    priority: number = 0
  ): ValidationRule {
    return {
      id,
      type,
      value,
      message,
      enabled,
      priority
    };
  }

  /**
   * Get default validation message for a type
   */
  public static getDefaultMessage(type: ValidationType): string {
    return DEFAULT_VALIDATION_MESSAGES[type] || DEFAULT_VALIDATION_MESSAGES.custom;
  }

  /**
   * Format validation message with parameters
   */
  public static formatMessage(message: string, params: Record<string, any>): string {
    let formattedMessage = message;
    
    Object.entries(params).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      formattedMessage = formattedMessage.replace(placeholder, String(value));
    });

    return formattedMessage;
  }

  /**
   * Check if a validation rule is applicable
   */
  public static isRuleApplicable(rule: ValidationRule, value: any): boolean {
    if (!rule.enabled) return false;

    // Check if value is empty and rule doesn't apply to empty values
    if (this.isEmpty(value) && rule.type !== 'required') {
      return false;
    }

    return true;
  }

  /**
   * Check if value is empty
   */
  public static isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  /**
   * Validate email format
   */
  public static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate URL format
   */
  public static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate phone number format
   */
  public static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validate date format
   */
  public static isValidDate(date: string | Date): boolean {
    const d = date instanceof Date ? date : new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  }

  /**
   * Validate number format
   */
  public static isValidNumber(value: any): boolean {
    return !isNaN(Number(value));
  }

  /**
   * Validate required field
   */
  public static validateRequired(value: any): ValidationResult {
    const isValid = !this.isEmpty(value);
    return this.createValidationResult(
      isValid,
      isValid ? 'Field is valid' : DEFAULT_VALIDATION_MESSAGES.required
    );
  }

  /**
   * Validate minimum length
   */
  public static validateMinLength(value: string, min: number): ValidationResult {
    const isValid = value.length >= min;
    return this.createValidationResult(
      isValid,
      isValid ? 'Length is valid' : this.formatMessage(DEFAULT_VALIDATION_MESSAGES.minLength, { min })
    );
  }

  /**
   * Validate maximum length
   */
  public static validateMaxLength(value: string, max: number): ValidationResult {
    const isValid = value.length <= max;
    return this.createValidationResult(
      isValid,
      isValid ? 'Length is valid' : this.formatMessage(DEFAULT_VALIDATION_MESSAGES.maxLength, { max })
    );
  }

  /**
   * Validate pattern (regex)
   */
  public static validatePattern(value: string, pattern: RegExp): ValidationResult {
    const isValid = pattern.test(value);
    return this.createValidationResult(
      isValid,
      isValid ? 'Pattern is valid' : DEFAULT_VALIDATION_MESSAGES.pattern
    );
  }

  /**
   * Validate minimum value
   */
  public static validateMin(value: number, min: number): ValidationResult {
    const isValid = value >= min;
    return this.createValidationResult(
      isValid,
      isValid ? 'Value is valid' : this.formatMessage(DEFAULT_VALIDATION_MESSAGES.min, { min })
    );
  }

  /**
   * Validate maximum value
   */
  public static validateMax(value: number, max: number): ValidationResult {
    const isValid = value <= max;
    return this.createValidationResult(
      isValid,
      isValid ? 'Value is valid' : this.formatMessage(DEFAULT_VALIDATION_MESSAGES.max, { max })
    );
  }

  /**
   * Validate email format
   */
  public static validateEmail(value: string): ValidationResult {
    const isValid = this.isValidEmail(value);
    return this.createValidationResult(
      isValid,
      isValid ? 'Email is valid' : DEFAULT_VALIDATION_MESSAGES.email
    );
  }

  /**
   * Validate URL format
   */
  public static validateUrl(value: string): ValidationResult {
    const isValid = this.isValidUrl(value);
    return this.createValidationResult(
      isValid,
      isValid ? 'URL is valid' : DEFAULT_VALIDATION_MESSAGES.url
    );
  }

  /**
   * Validate phone format
   */
  public static validatePhone(value: string): ValidationResult {
    const isValid = this.isValidPhone(value);
    return this.createValidationResult(
      isValid,
      isValid ? 'Phone is valid' : DEFAULT_VALIDATION_MESSAGES.phone
    );
  }

  /**
   * Validate date format
   */
  public static validateDate(value: string | Date): ValidationResult {
    const isValid = this.isValidDate(value);
    return this.createValidationResult(
      isValid,
      isValid ? 'Date is valid' : DEFAULT_VALIDATION_MESSAGES.date
    );
  }

  /**
   * Validate number format
   */
  public static validateNumber(value: any): ValidationResult {
    const isValid = this.isValidNumber(value);
    return this.createValidationResult(
      isValid,
      isValid ? 'Number is valid' : DEFAULT_VALIDATION_MESSAGES.number
    );
  }

  /**
   * Validate file size
   */
  public static validateFileSize(file: File, maxSize: number): ValidationResult {
    const isValid = file.size <= maxSize;
    return this.createValidationResult(
      isValid,
      isValid ? 'File size is valid' : this.formatMessage(DEFAULT_VALIDATION_MESSAGES.fileSize, { maxSize })
    );
  }

  /**
   * Validate file type
   */
  public static validateFileType(file: File, allowedTypes: string[]): ValidationResult {
    const isValid = allowedTypes.includes(file.type);
    return this.createValidationResult(
      isValid,
      isValid ? 'File type is valid' : this.formatMessage(DEFAULT_VALIDATION_MESSAGES.fileType, { allowedTypes: allowedTypes.join(', ') })
    );
  }

  /**
   * Combine validation results
   */
  public static combineResults(results: ValidationResult[]): ValidationResult {
    const errors = results.filter(r => !r.isValid && r.severity === 'error');
    const warnings = results.filter(r => !r.isValid && r.severity === 'warning');
    const infos = results.filter(r => r.isValid && r.severity === 'info');

    return {
      isValid: errors.length === 0,
      message: errors.length > 0 ? errors[0].message : 'All validations passed',
      severity: errors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'info',
      details: {
        errors: errors.map(r => r.message),
        warnings: warnings.map(r => r.message),
        infos: infos.map(r => r.message)
      }
    };
  }

  /**
   * Sort validation rules by priority
   */
  public static sortRulesByPriority(rules: ValidationRule[]): ValidationRule[] {
    return rules.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Filter validation rules by type
   */
  public static filterRulesByType(rules: ValidationRule[], type: ValidationType): ValidationRule[] {
    return rules.filter(rule => rule.type === type);
  }

  /**
   * Get validation rules for a field type
   */
  public static getRulesForFieldType(fieldType: string): ValidationRule[] {
    const commonRules: ValidationRule[] = [
      this.createValidationRule('required', 'required', DEFAULT_VALIDATION_MESSAGES.required)
    ];

    switch (fieldType) {
      case 'email':
        commonRules.push(
          this.createValidationRule('email', 'email', DEFAULT_VALIDATION_MESSAGES.email)
        );
        break;

      case 'url':
        commonRules.push(
          this.createValidationRule('url', 'url', DEFAULT_VALIDATION_MESSAGES.url)
        );
        break;

      case 'phone':
        commonRules.push(
          this.createValidationRule('phone', 'phone', DEFAULT_VALIDATION_MESSAGES.phone)
        );
        break;

      case 'number':
      case 'currency':
      case 'percentage':
        commonRules.push(
          this.createValidationRule('number', 'number', DEFAULT_VALIDATION_MESSAGES.number)
        );
        break;

      case 'date':
        commonRules.push(
          this.createValidationRule('date', 'date', DEFAULT_VALIDATION_MESSAGES.date)
        );
        break;

      case 'file':
        commonRules.push(
          this.createValidationRule('fileSize', 'fileSize', DEFAULT_VALIDATION_MESSAGES.fileSize),
          this.createValidationRule('fileType', 'fileType', DEFAULT_VALIDATION_MESSAGES.fileType)
        );
        break;
    }

    return commonRules;
  }

  /**
   * Create custom validation rule
   */
  public static createCustomRule(
    id: string,
    validator: (value: any) => boolean,
    message: string,
    enabled: boolean = true,
    priority: number = 0
  ): ValidationRule {
    return {
      id,
      type: 'custom',
      message,
      enabled,
      priority,
      customValidator: async (context) => {
        const isValid = validator(context.fieldValue);
        return this.createValidationResult(isValid, message);
      }
    };
  }

  /**
   * Validate against multiple rules
   */
  public static validateAgainstRules(
    value: any,
    rules: ValidationRule[]
  ): ValidationResult[] {
    return rules
      .filter(rule => this.isRuleApplicable(rule, value))
      .map(rule => {
        switch (rule.type) {
          case 'required':
            return this.validateRequired(value);
          case 'minLength':
            return this.validateMinLength(value, rule.value);
          case 'maxLength':
            return this.validateMaxLength(value, rule.value);
          case 'pattern':
            return this.validatePattern(value, new RegExp(rule.value));
          case 'min':
            return this.validateMin(value, rule.value);
          case 'max':
            return this.validateMax(value, rule.value);
          case 'email':
            return this.validateEmail(value);
          case 'url':
            return this.validateUrl(value);
          case 'phone':
            return this.validatePhone(value);
          case 'date':
            return this.validateDate(value);
          case 'number':
            return this.validateNumber(value);
          case 'fileSize':
            return this.validateFileSize(value, rule.value);
          case 'fileType':
            return this.validateFileType(value, rule.value);
          default:
            return this.createValidationResult(true, 'Unknown validation type');
        }
      });
  }
}
