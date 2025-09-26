/**
 * Field Renderer - Service for rendering field components
 */

import { FieldInstance, FieldRenderOptions } from '../types/field.types';

export class FieldRenderer {
  private static instance: FieldRenderer;

  private constructor() {}

  public static getInstance(): FieldRenderer {
    if (!FieldRenderer.instance) {
      FieldRenderer.instance = new FieldRenderer();
    }
    return FieldRenderer.instance;
  }

  /**
   * Render a field instance
   */
  public renderField(
    field: FieldInstance,
    options: FieldRenderOptions = {}
  ): string {
    const renderOptions = this.mergeRenderOptions(field, options);
    const component = this.getComponentName(field);
    
    return this.generateFieldHTML(field, component, renderOptions);
  }

  /**
   * Render multiple fields
   */
  public renderFields(
    fields: FieldInstance[],
    options: FieldRenderOptions = {}
  ): string {
    return fields
      .map(field => this.renderField(field, options))
      .join('\n');
  }

  /**
   * Render field as React component
   */
  public renderReactComponent(
    field: FieldInstance,
    options: FieldRenderOptions = {}
  ): string {
    const renderOptions = this.mergeRenderOptions(field, options);
    const component = this.getComponentName(field);
    
    return this.generateReactJSX(field, component, renderOptions);
  }

  /**
   * Render field as Vue component
   */
  public renderVueComponent(
    field: FieldInstance,
    options: FieldRenderOptions = {}
  ): string {
    const renderOptions = this.mergeRenderOptions(field, options);
    const component = this.getComponentName(field);
    
    return this.generateVueTemplate(field, component, renderOptions);
  }

  /**
   * Render field as Angular component
   */
  public renderAngularComponent(
    field: FieldInstance,
    options: FieldRenderOptions = {}
  ): string {
    const renderOptions = this.mergeRenderOptions(field, options);
    const component = this.getComponentName(field);
    
    return this.generateAngularTemplate(field, component, renderOptions);
  }

  /**
   * Get component name for field
   */
  private getComponentName(field: FieldInstance): string {
    return field.definition.component || field.definition.type;
  }

  /**
   * Merge render options with field configuration
   */
  private mergeRenderOptions(
    field: FieldInstance,
    options: FieldRenderOptions
  ): FieldRenderOptions {
    const fieldOptions = field.configuration.renderOptions || {};
    
    return {
      theme: options.theme || fieldOptions.theme || 'default',
      size: options.size || fieldOptions.size || 'medium',
      variant: options.variant || fieldOptions.variant || 'outlined',
      disabled: options.disabled !== undefined ? options.disabled : fieldOptions.disabled || !field.isEnabled,
      readonly: options.readonly !== undefined ? options.readonly : fieldOptions.readonly || false,
      placeholder: options.placeholder || fieldOptions.placeholder || field.configuration.placeholder || '',
      helpText: options.helpText || fieldOptions.helpText || field.configuration.helpText || '',
      errorText: options.errorText || fieldOptions.errorText || (field.errors.length > 0 ? field.errors[0] : ''),
      warningText: options.warningText || fieldOptions.warningText || (field.warnings.length > 0 ? field.warnings[0] : ''),
      className: options.className || fieldOptions.className || field.configuration.className || '',
      style: options.style || fieldOptions.style || field.configuration.style || {}
    };
  }

  /**
   * Generate HTML for field
   */
  private generateFieldHTML(
    field: FieldInstance,
    component: string,
    options: FieldRenderOptions
  ): string {
    const {
      theme,
      size,
      variant,
      disabled,
      readonly,
      placeholder,
      helpText,
      errorText,
      warningText,
      className,
      style
    } = options;

    const fieldId = field.id;
    const fieldName = field.definition.name;
    const fieldType = field.definition.type;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;
    const hasError = field.errors.length > 0;
    const hasWarning = field.warnings.length > 0;

    const baseClasses = [
      'field',
      `field-${fieldType}`,
      `field-${theme}`,
      `field-${size}`,
      `field-${variant}`,
      hasError ? 'field-error' : '',
      hasWarning ? 'field-warning' : '',
      disabled ? 'field-disabled' : '',
      readonly ? 'field-readonly' : '',
      className
    ].filter(Boolean).join(' ');

    const styleString = Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    let inputHTML = '';

    switch (fieldType) {
      case 'text':
      case 'email':
      case 'password':
      case 'url':
      case 'search':
        inputHTML = this.generateTextInputHTML(field, options);
        break;
      case 'textarea':
        inputHTML = this.generateTextAreaHTML(field, options);
        break;
      case 'number':
      case 'currency':
      case 'percentage':
        inputHTML = this.generateNumberInputHTML(field, options);
        break;
      case 'tel':
        inputHTML = this.generatePhoneInputHTML(field, options);
        break;
      case 'select':
        inputHTML = this.generateSelectHTML(field, options);
        break;
      case 'radio':
        inputHTML = this.generateRadioHTML(field, options);
        break;
      case 'checkbox':
        inputHTML = this.generateCheckboxHTML(field, options);
        break;
      case 'date':
        inputHTML = this.generateDateInputHTML(field, options);
        break;
      case 'time':
        inputHTML = this.generateTimeInputHTML(field, options);
        break;
      case 'file':
        inputHTML = this.generateFileInputHTML(field, options);
        break;
      default:
        inputHTML = this.generateGenericInputHTML(field, options);
    }

    return `
      <div class="${baseClasses}" style="${styleString}" data-field-id="${fieldId}">
        <label for="${fieldId}" class="field-label">
          ${fieldName}
          ${isRequired ? '<span class="field-required">*</span>' : ''}
        </label>
        ${inputHTML}
        ${helpText ? `<div class="field-help">${helpText}</div>` : ''}
        ${errorText ? `<div class="field-error-message">${errorText}</div>` : ''}
        ${warningText ? `<div class="field-warning-message">${warningText}</div>` : ''}
      </div>
    `;
  }

  /**
   * Generate text input HTML
   */
  private generateTextInputHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly, placeholder } = options;
    const fieldId = field.id;
    const fieldType = field.definition.type;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;

    return `
      <input
        type="${fieldType}"
        id="${fieldId}"
        name="${fieldId}"
        value="${fieldValue}"
        placeholder="${placeholder}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        class="field-input"
      />
    `;
  }

  /**
   * Generate textarea HTML
   */
  private generateTextAreaHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly, placeholder } = options;
    const fieldId = field.id;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;
    const rows = field.configuration.rows || 4;

    return `
      <textarea
        id="${fieldId}"
        name="${fieldId}"
        placeholder="${placeholder}"
        rows="${rows}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        class="field-input"
      >${fieldValue}</textarea>
    `;
  }

  /**
   * Generate number input HTML
   */
  private generateNumberInputHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly, placeholder } = options;
    const fieldId = field.id;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;
    const min = field.configuration.min;
    const max = field.configuration.max;
    const step = field.configuration.step;

    return `
      <input
        type="number"
        id="${fieldId}"
        name="${fieldId}"
        value="${fieldValue}"
        placeholder="${placeholder}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        ${min !== undefined ? `min="${min}"` : ''}
        ${max !== undefined ? `max="${max}"` : ''}
        ${step !== undefined ? `step="${step}"` : ''}
        class="field-input"
      />
    `;
  }

  /**
   * Generate phone input HTML
   */
  private generatePhoneInputHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly, placeholder } = options;
    const fieldId = field.id;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;

    return `
      <input
        type="tel"
        id="${fieldId}"
        name="${fieldId}"
        value="${fieldValue}"
        placeholder="${placeholder}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        class="field-input"
      />
    `;
  }

  /**
   * Generate select HTML
   */
  private generateSelectHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly } = options;
    const fieldId = field.id;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;
    const options_list = field.configuration.options || [];
    const multiple = field.configuration.multiple || false;

    const optionsHTML = options_list
      .map((option: any) => {
        const value = option.value || option;
        const label = option.label || option;
        const selected = fieldValue === value || (Array.isArray(fieldValue) && fieldValue.includes(value));
        return `<option value="${value}" ${selected ? 'selected' : ''}>${label}</option>`;
      })
      .join('');

    return `
      <select
        id="${fieldId}"
        name="${fieldId}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        ${multiple ? 'multiple' : ''}
        class="field-input"
      >
        ${optionsHTML}
      </select>
    `;
  }

  /**
   * Generate radio HTML
   */
  private generateRadioHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly } = options;
    const fieldId = field.id;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;
    const options_list = field.configuration.options || [];
    const layout = field.configuration.layout || 'vertical';

    const radioHTML = options_list
      .map((option: any, index: number) => {
        const value = option.value || option;
        const label = option.label || option;
        const optionId = `${fieldId}_${index}`;
        const checked = fieldValue === value;
        
        return `
          <div class="field-radio-option">
            <input
              type="radio"
              id="${optionId}"
              name="${fieldId}"
              value="${value}"
              ${checked ? 'checked' : ''}
              ${isRequired ? 'required' : ''}
              ${disabled ? 'disabled' : ''}
              ${readonly ? 'readonly' : ''}
              class="field-input"
            />
            <label for="${optionId}" class="field-radio-label">${label}</label>
          </div>
        `;
      })
      .join('');

    return `
      <div class="field-radio-group field-radio-${layout}">
        ${radioHTML}
      </div>
    `;
  }

  /**
   * Generate checkbox HTML
   */
  private generateCheckboxHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly } = options;
    const fieldId = field.id;
    const fieldValue = field.value || [];
    const isRequired = field.isRequired;
    const options_list = field.configuration.options || [];
    const layout = field.configuration.layout || 'vertical';

    const checkboxHTML = options_list
      .map((option: any, index: number) => {
        const value = option.value || option;
        const label = option.label || option;
        const optionId = `${fieldId}_${index}`;
        const checked = Array.isArray(fieldValue) && fieldValue.includes(value);
        
        return `
          <div class="field-checkbox-option">
            <input
              type="checkbox"
              id="${optionId}"
              name="${fieldId}"
              value="${value}"
              ${checked ? 'checked' : ''}
              ${isRequired ? 'required' : ''}
              ${disabled ? 'disabled' : ''}
              ${readonly ? 'readonly' : ''}
              class="field-input"
            />
            <label for="${optionId}" class="field-checkbox-label">${label}</label>
          </div>
        `;
      })
      .join('');

    return `
      <div class="field-checkbox-group field-checkbox-${layout}">
        ${checkboxHTML}
      </div>
    `;
  }

  /**
   * Generate date input HTML
   */
  private generateDateInputHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly } = options;
    const fieldId = field.id;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;

    return `
      <input
        type="date"
        id="${fieldId}"
        name="${fieldId}"
        value="${fieldValue}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        class="field-input"
      />
    `;
  }

  /**
   * Generate time input HTML
   */
  private generateTimeInputHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly } = options;
    const fieldId = field.id;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;

    return `
      <input
        type="time"
        id="${fieldId}"
        name="${fieldId}"
        value="${fieldValue}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        class="field-input"
      />
    `;
  }

  /**
   * Generate file input HTML
   */
  private generateFileInputHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly } = options;
    const fieldId = field.id;
    const isRequired = field.isRequired;
    const accept = field.configuration.accept || '';
    const multiple = field.configuration.multiple || false;

    return `
      <input
        type="file"
        id="${fieldId}"
        name="${fieldId}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        ${accept ? `accept="${accept}"` : ''}
        ${multiple ? 'multiple' : ''}
        class="field-input"
      />
    `;
  }

  /**
   * Generate generic input HTML
   */
  private generateGenericInputHTML(field: FieldInstance, options: FieldRenderOptions): string {
    const { disabled, readonly, placeholder } = options;
    const fieldId = field.id;
    const fieldType = field.definition.type;
    const fieldValue = field.value || '';
    const isRequired = field.isRequired;

    return `
      <input
        type="${fieldType}"
        id="${fieldId}"
        name="${fieldId}"
        value="${fieldValue}"
        placeholder="${placeholder}"
        ${isRequired ? 'required' : ''}
        ${disabled ? 'disabled' : ''}
        ${readonly ? 'readonly' : ''}
        class="field-input"
      />
    `;
  }

  /**
   * Generate React JSX
   */
  private generateReactJSX(
    field: FieldInstance,
    component: string,
    options: FieldRenderOptions
  ): string {
    // This would generate React JSX code
    // Implementation depends on your React component structure
    return `// React component for ${field.definition.name}`;
  }

  /**
   * Generate Vue template
   */
  private generateVueTemplate(
    field: FieldInstance,
    component: string,
    options: FieldRenderOptions
  ): string {
    // This would generate Vue template code
    // Implementation depends on your Vue component structure
    return `<!-- Vue component for ${field.definition.name} -->`;
  }

  /**
   * Generate Angular template
   */
  private generateAngularTemplate(
    field: FieldInstance,
    component: string,
    options: FieldRenderOptions
  ): string {
    // This would generate Angular template code
    // Implementation depends on your Angular component structure
    return `<!-- Angular component for ${field.definition.name} -->`;
  }
}
