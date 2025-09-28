/**
 * Core field type definitions based on comprehensive field taxonomy
 */

export type ResponseType = 
  | 'Text' 
  | 'Integer' 
  | 'Float' 
  | 'Boolean' 
  | 'Date' 
  | 'DateTime' 
  | 'Time' 
  | 'Email' 
  | 'Phone' 
  | 'URL' 
  | 'Password' 
  | 'TextArea' 
  | 'Select' 
  | 'MultiSelect' 
  | 'Radio' 
  | 'Checkbox' 
  | 'File' 
  | 'Image' 
  | 'Signature' 
  | 'Location' 
  | 'Rating' 
  | 'Slider' 
  | 'Color' 
  | 'RichText' 
  | 'JSON' 
  | 'SingleChoiceSelection' 
  | 'MultiChoiceSelection' 
  | 'TextArray' 
  | 'Object' 
  | 'Array';

export type FieldCategory = 
  | 'text-based'
  | 'numeric'
  | 'selection-choice'
  | 'date-time'
  | 'rating-feedback'
  | 'measurement'
  | 'geographic'
  | 'media-file'
  | 'healthcare'
  | 'business-professional'
  | 'educational'
  | 'e-commerce'
  | 'survey-research'
  | 'interactive-advanced';

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

export type ConfigurationType = 
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'select'
  | 'multiselect'
  | 'range';

export interface ValidationOption {
  type: ValidationType;
  value?: any;
  message: string;
  enabled?: boolean;
}

export interface ConfigurationOption {
  key: string;
  type: ConfigurationType;
  defaultValue: any;
  description: string;
  options?: any[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface FieldDependency {
  fieldId: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan' | 'isEmpty' | 'isNotEmpty';
  value?: any;
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'optional';
}

export interface AccessibilityOptions {
  ariaLabel?: string;
  ariaDescription?: string;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  tabIndex?: number;
  role?: string;
  keyboardNavigation?: boolean;
  screenReaderSupport?: boolean;
}

export interface FieldDefinition {
  id: string;
  name: string;
  category: FieldCategory;
  type: string;
  responseType: ResponseType;
  description: string;
  icon: string;
  validationOptions: ValidationOption[];
  configurationOptions: ConfigurationOption[];
  defaultValue?: any;
  required: boolean;
  dependencies?: FieldDependency[];
  useCases: string[];
  accessibility: AccessibilityOptions;
  htmlType?: string;
  component?: string;
  schema?: any;
  logic?: FieldLogic;
}

export interface FieldLogic {
  calculations?: CalculationRule[];
  conditions?: ConditionalRule[];
  transformations?: TransformationRule[];
  validations?: ValidationRule[];
}

export interface CalculationRule {
  id: string;
  formula: string;
  dependencies: string[];
  resultType: ResponseType;
}

export interface ConditionalRule {
  id: string;
  condition: string;
  action: 'show' | 'hide' | 'enable' | 'disable';
  targetFields: string[];
}

export interface TransformationRule {
  id: string;
  type: 'format' | 'convert' | 'transform';
  input: string;
  output: string;
  parameters?: any;
}

export interface ValidationRule {
  id: string;
  type: ValidationType;
  condition: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface FieldInstance {
  id: string;
  definition: FieldDefinition;
  value?: any;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  isVisible: boolean;
  isEnabled: boolean;
  isRequired: boolean;
  configuration: Record<string, any>;
  metadata: Record<string, any>;
}

export interface FieldRenderOptions {
  theme?: 'default' | 'material' | 'bootstrap' | 'tailwind';
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled' | 'standard';
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  helpText?: string;
  errorText?: string;
  warningText?: string;
  className?: string;
  style?: Record<string, any>;
}

export interface FieldValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  value?: any;
  transformedValue?: any;
}

export interface FieldConfiguration {
  [key: string]: any;
}

export interface FieldMetadata {
  created: Date;
  modified: Date;
  version: string;
  author?: string;
  tags?: string[];
  description?: string;
}
