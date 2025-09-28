/**
 * Field helper utilities
 */

import { FieldDefinition, FieldInstance, FieldCategory, ResponseType } from '../types/field.types';

export class FieldHelpers {
  /**
   * Get field display name
   */
  public static getDisplayName(field: FieldDefinition | FieldInstance): string {
    return 'definition' in field ? field.definition.name : field.name;
  }

  /**
   * Get field description
   */
  public static getDescription(field: FieldDefinition | FieldInstance): string {
    return 'definition' in field ? field.definition.description : field.description;
  }

  /**
   * Get field icon
   */
  public static getIcon(field: FieldDefinition | FieldInstance): string {
    return 'definition' in field ? field.definition.icon : field.icon;
  }

  /**
   * Get field category
   */
  public static getCategory(field: FieldDefinition | FieldInstance): FieldCategory {
    return 'definition' in field ? field.definition.category : field.category;
  }

  /**
   * Get field response type
   */
  public static getResponseType(field: FieldDefinition | FieldInstance): ResponseType {
    return 'definition' in field ? field.definition.responseType : field.responseType;
  }

  /**
   * Check if field is required
   */
  public static isRequired(field: FieldDefinition | FieldInstance): boolean {
    return 'definition' in field ? field.definition.required : field.required;
  }

  /**
   * Get field use cases
   */
  public static getUseCases(field: FieldDefinition | FieldInstance): string[] {
    return 'definition' in field ? field.definition.useCases : field.useCases;
  }

  /**
   * Check if field has validation
   */
  public static hasValidation(field: FieldDefinition | FieldInstance): boolean {
    const validationOptions = 'definition' in field ? field.definition.validationOptions : field.validationOptions;
    return validationOptions.length > 0;
  }

  /**
   * Get validation options
   */
  public static getValidationOptions(field: FieldDefinition | FieldInstance) {
    return 'definition' in field ? field.definition.validationOptions : field.validationOptions;
  }

  /**
   * Get configuration options
   */
  public static getConfigurationOptions(field: FieldDefinition | FieldInstance) {
    return 'definition' in field ? field.definition.configurationOptions : field.configurationOptions;
  }

  /**
   * Check if field supports a specific configuration option
   */
  public static supportsConfigurationOption(
    field: FieldDefinition | FieldInstance, 
    optionKey: string
  ): boolean {
    const configurationOptions = 'definition' in field ? field.definition.configurationOptions : field.configurationOptions;
    return configurationOptions.some(option => option.key === optionKey);
  }

  /**
   * Get default value for a field
   */
  public static getDefaultValue(field: FieldDefinition | FieldInstance): any {
    return 'definition' in field ? field.definition.defaultValue : field.defaultValue;
  }

  /**
   * Check if field is visible
   */
  public static isVisible(field: FieldInstance): boolean {
    return field.isVisible;
  }

  /**
   * Check if field is enabled
   */
  public static isEnabled(field: FieldInstance): boolean {
    return field.isEnabled;
  }

  /**
   * Check if field is valid
   */
  public static isValid(field: FieldInstance): boolean {
    return field.isValid;
  }

  /**
   * Get field errors
   */
  public static getErrors(field: FieldInstance): string[] {
    return field.errors;
  }

  /**
   * Get field warnings
   */
  public static getWarnings(field: FieldInstance): string[] {
    return field.warnings;
  }

  /**
   * Get field value
   */
  public static getValue(field: FieldInstance): any {
    return field.value;
  }

  /**
   * Set field value
   */
  public static setValue(field: FieldInstance, value: any): void {
    field.value = value;
    field.metadata.modified = new Date();
  }

  /**
   * Clear field value
   */
  public static clearValue(field: FieldInstance): void {
    field.value = field.definition.defaultValue;
    field.metadata.modified = new Date();
  }

  /**
   * Reset field to default state
   */
  public static resetField(field: FieldInstance): void {
    field.value = field.definition.defaultValue;
    field.isValid = true;
    field.errors = [];
    field.warnings = [];
    field.isVisible = true;
    field.isEnabled = true;
    field.metadata.modified = new Date();
  }

  /**
   * Clone a field instance
   */
  public static cloneField(field: FieldInstance, newId?: string): FieldInstance {
    return {
      ...field,
      id: newId || `${field.id}_clone_${Date.now()}`,
      metadata: {
        ...field.metadata,
        created: new Date(),
        modified: new Date()
      }
    };
  }

  /**
   * Merge field configurations
   */
  public static mergeConfigurations(
    baseConfig: Record<string, any>,
    overrideConfig: Record<string, any>
  ): Record<string, any> {
    return { ...baseConfig, ...overrideConfig };
  }

  /**
   * Get field configuration value
   */
  public static getConfigurationValue(
    field: FieldInstance,
    key: string,
    defaultValue?: any
  ): any {
    return field.configuration[key] !== undefined ? field.configuration[key] : defaultValue;
  }

  /**
   * Set field configuration value
   */
  public static setConfigurationValue(
    field: FieldInstance,
    key: string,
    value: any
  ): void {
    field.configuration[key] = value;
    field.metadata.modified = new Date();
  }

  /**
   * Check if field has dependencies
   */
  public static hasDependencies(field: FieldDefinition | FieldInstance): boolean {
    return 'dependencies' in field && field.dependencies && field.dependencies.length > 0;
  }

  /**
   * Get field dependencies
   */
  public static getDependencies(field: FieldDefinition | FieldInstance) {
    return 'dependencies' in field ? (field.dependencies || []) : [];
  }

  /**
   * Check if field is conditional
   */
  public static isConditional(field: FieldInstance): boolean {
    return field.configuration.conditional !== undefined;
  }

  /**
   * Get conditional configuration
   */
  public static getConditionalConfig(field: FieldInstance) {
    return field.configuration.conditional;
  }

  /**
   * Check if field is calculated
   */
  public static isCalculated(field: FieldInstance): boolean {
    return field.configuration.calculated === true;
  }

  /**
   * Get calculation formula
   */
  public static getCalculationFormula(field: FieldInstance): string | null {
    return field.configuration.formula || null;
  }

  /**
   * Get calculation dependencies
   */
  public static getCalculationDependencies(field: FieldInstance): string[] {
    return field.configuration.dependencies || [];
  }

  /**
   * Check if field has custom validation
   */
  public static hasCustomValidation(field: FieldInstance): boolean {
    return field.configuration.customValidation !== undefined;
  }

  /**
   * Get custom validation rules
   */
  public static getCustomValidationRules(field: FieldInstance) {
    return field.configuration.customValidation || [];
  }

  /**
   * Check if field has styling
   */
  public static hasStyling(field: FieldInstance): boolean {
    return field.configuration.styling !== undefined;
  }

  /**
   * Get field styling
   */
  public static getStyling(field: FieldInstance) {
    return field.configuration.styling || {};
  }

  /**
   * Check if field has accessibility features
   */
  public static hasAccessibilityFeatures(field: FieldInstance): boolean {
    return field.configuration.accessibility !== undefined;
  }

  /**
   * Get accessibility configuration
   */
  public static getAccessibilityConfig(field: FieldInstance) {
    return field.configuration.accessibility || field.definition.accessibility;
  }

  /**
   * Check if field has internationalization
   */
  public static hasInternationalization(field: FieldInstance): boolean {
    return field.configuration.i18n !== undefined;
  }

  /**
   * Get internationalization configuration
   */
  public static getInternationalizationConfig(field: FieldInstance) {
    return field.configuration.i18n || {};
  }

  /**
   * Check if field has data binding
   */
  public static hasDataBinding(field: FieldInstance): boolean {
    return field.configuration.dataBinding !== undefined;
  }

  /**
   * Get data binding configuration
   */
  public static getDataBindingConfig(field: FieldInstance) {
    return field.configuration.dataBinding || {};
  }

  /**
   * Check if field has real-time validation
   */
  public static hasRealtimeValidation(field: FieldInstance): boolean {
    return field.configuration.realtimeValidation !== undefined;
  }

  /**
   * Get real-time validation configuration
   */
  public static getRealtimeValidationConfig(field: FieldInstance) {
    return field.configuration.realtimeValidation || {};
  }

  /**
   * Get field metadata
   */
  public static getMetadata(field: FieldInstance) {
    return field.metadata;
  }

  /**
   * Update field metadata
   */
  public static updateMetadata(field: FieldInstance, updates: Partial<typeof field.metadata>): void {
    Object.assign(field.metadata, updates);
    field.metadata.modified = new Date();
  }

  /**
   * Check if field is empty
   */
  public static isEmpty(field: FieldInstance): boolean {
    const value = field.value;
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  /**
   * Check if field has changed from default
   */
  public static hasChanged(field: FieldInstance): boolean {
    return JSON.stringify(field.value) !== JSON.stringify(field.definition.defaultValue);
  }

  /**
   * Get field change summary
   */
  public static getChangeSummary(field: FieldInstance): {
    hasChanged: boolean;
    originalValue: any;
    currentValue: any;
    changeType: 'added' | 'removed' | 'modified' | 'unchanged';
  } {
    const hasChanged = this.hasChanged(field);
    const originalValue = field.definition.defaultValue;
    const currentValue = field.value;

    let changeType: 'added' | 'removed' | 'modified' | 'unchanged' = 'unchanged';
    if (hasChanged) {
      if (originalValue === null || originalValue === undefined) {
        changeType = 'added';
      } else if (currentValue === null || currentValue === undefined) {
        changeType = 'removed';
      } else {
        changeType = 'modified';
      }
    }

    return {
      hasChanged,
      originalValue,
      currentValue,
      changeType
    };
  }

  /**
   * Format field value for display
   */
  public static formatValue(field: FieldInstance, format?: string): string {
    const value = field.value;
    if (value === null || value === undefined) return '';

    switch (field.definition.responseType) {
      case 'Date':
        return new Date(value).toLocaleDateString();
      case 'DateTime':
        return new Date(value).toLocaleString();
      case 'Time':
        return new Date(value).toLocaleTimeString();
      case 'Boolean':
        return value ? 'Yes' : 'No';
      case 'Array':
        return Array.isArray(value) ? value.join(', ') : String(value);
      default:
        return String(value);
    }
  }

  /**
   * Get field summary
   */
  public static getFieldSummary(field: FieldInstance): {
    id: string;
    name: string;
    type: string;
    category: string;
    value: any;
    isValid: boolean;
    hasErrors: boolean;
    hasWarnings: boolean;
    isEmpty: boolean;
    hasChanged: boolean;
    isVisible: boolean;
    isEnabled: boolean;
    isRequired: boolean;
  } {
    return {
      id: field.id,
      name: field.definition.name,
      type: field.definition.type,
      category: field.definition.category,
      value: field.value,
      isValid: field.isValid,
      hasErrors: field.errors.length > 0,
      hasWarnings: field.warnings.length > 0,
      isEmpty: this.isEmpty(field),
      hasChanged: this.hasChanged(field),
      isVisible: field.isVisible,
      isEnabled: field.isEnabled,
      isRequired: field.isRequired
    };
  }
}
