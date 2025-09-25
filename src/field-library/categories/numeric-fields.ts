/**
 * Numeric field definitions
 * Category: Numeric Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const NUMERIC_FIELDS: FieldDefinition[] = [
  {
    id: 'number',
    name: 'Number',
    category: 'numeric',
    type: 'number',
    responseType: 'Integer',
    description: 'Generic number input',
    icon: 'number',
    htmlType: 'number',
    component: 'NumberInput',
    validationOptions: [
      {
        type: 'required',
        message: 'This field is required'
      },
      {
        type: 'number',
        message: 'Please enter a valid number'
      },
      {
        type: 'min',
        value: 0,
        message: 'Value must be at least {min}'
      },
      {
        type: 'max',
        value: 999999,
        message: 'Value must be no more than {max}'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter a number...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum allowed value'
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 999999,
        description: 'Maximum allowed value'
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 1,
        description: 'Step increment for the number input',
        min: 0.01,
        max: 1000
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 0,
        description: 'Number of decimal places',
        min: 0,
        max: 10
      },
      {
        key: 'allowNegative',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow negative numbers'
      },
      {
        key: 'thousandSeparator',
        type: 'string',
        defaultValue: ',',
        description: 'Thousands separator character',
        options: [',', '.', ' ', '']
      },
      {
        key: 'decimalSeparator',
        type: 'string',
        defaultValue: '.',
        description: 'Decimal separator character',
        options: ['.', ',']
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Quantities', 'Scores', 'Counts', 'Measurements'],
    accessibility: {
      ariaLabel: 'Number input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'currency',
    name: 'Currency',
    category: 'numeric',
    type: 'currency',
    responseType: 'Float',
    description: 'Money amount input',
    icon: 'currency',
    htmlType: 'number',
    component: 'CurrencyInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Amount is required'
      },
      {
        type: 'number',
        message: 'Please enter a valid amount'
      },
      {
        type: 'min',
        value: 0,
        message: 'Amount must be at least {min}'
      },
      {
        type: 'max',
        value: 999999999.99,
        message: 'Amount is too large'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: '0.00',
        description: 'Placeholder text for the field'
      },
      {
        key: 'currency',
        type: 'string',
        defaultValue: 'USD',
        description: 'Currency code',
        options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD']
      },
      {
        key: 'symbol',
        type: 'string',
        defaultValue: '$',
        description: 'Currency symbol'
      },
      {
        key: 'symbolPosition',
        type: 'string',
        defaultValue: 'before',
        description: 'Symbol position',
        options: ['before', 'after']
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum amount allowed'
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 999999999.99,
        description: 'Maximum amount allowed'
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 2,
        description: 'Number of decimal places',
        min: 0,
        max: 4
      },
      {
        key: 'thousandSeparator',
        type: 'string',
        defaultValue: ',',
        description: 'Thousands separator',
        options: [',', '.', ' ', '']
      },
      {
        key: 'showSymbol',
        type: 'boolean',
        defaultValue: true,
        description: 'Show currency symbol'
      },
      {
        key: 'allowNegative',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow negative amounts'
      }
    ],
    defaultValue: 0.00,
    required: false,
    useCases: ['Pricing', 'Payments', 'Budgets', 'Financial forms'],
    accessibility: {
      ariaLabel: 'Currency amount input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'percentage',
    name: 'Percentage',
    category: 'numeric',
    type: 'percentage',
    responseType: 'Float',
    description: 'Percentage input (0-100)',
    icon: 'percentage',
    htmlType: 'number',
    component: 'PercentageInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Percentage is required'
      },
      {
        type: 'number',
        message: 'Please enter a valid percentage'
      },
      {
        type: 'min',
        value: 0,
        message: 'Percentage must be at least 0%'
      },
      {
        type: 'max',
        value: 100,
        message: 'Percentage cannot exceed 100%'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: '0',
        description: 'Placeholder text for the field'
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum percentage allowed',
        min: 0,
        max: 100
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 100,
        description: 'Maximum percentage allowed',
        min: 0,
        max: 1000
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 0.1,
        description: 'Step increment',
        min: 0.01,
        max: 10
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 1,
        description: 'Number of decimal places',
        min: 0,
        max: 3
      },
      {
        key: 'showSymbol',
        type: 'boolean',
        defaultValue: true,
        description: 'Show percentage symbol (%)'
      },
      {
        key: 'allowOver100',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow values over 100%'
      },
      {
        key: 'displayAsDecimal',
        type: 'boolean',
        defaultValue: false,
        description: 'Display as decimal (0.5 instead of 50%)'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Rates', 'Completion status', 'Progress tracking', 'Statistics'],
    accessibility: {
      ariaLabel: 'Percentage input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'phone',
    name: 'Phone',
    category: 'numeric',
    type: 'tel',
    responseType: 'Phone',
    description: 'Phone number input',
    icon: 'phone',
    htmlType: 'tel',
    component: 'PhoneInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Phone number is required'
      },
      {
        type: 'phone',
        message: 'Please enter a valid phone number'
      },
      {
        type: 'minLength',
        value: 10,
        message: 'Phone number is too short'
      },
      {
        type: 'maxLength',
        value: 15,
        message: 'Phone number is too long'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: '(555) 123-4567',
        description: 'Placeholder text for the field'
      },
      {
        key: 'country',
        type: 'string',
        defaultValue: 'US',
        description: 'Default country code',
        options: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN']
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: 'national',
        description: 'Phone number format',
        options: ['national', 'international', 'e164']
      },
      {
        key: 'allowInternational',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow international numbers'
      },
      {
        key: 'showCountryFlag',
        type: 'boolean',
        defaultValue: true,
        description: 'Show country flag'
      },
      {
        key: 'autoFormat',
        type: 'boolean',
        defaultValue: true,
        description: 'Auto-format as user types'
      },
      {
        key: 'allowedCountries',
        type: 'array',
        defaultValue: [],
        description: 'Restrict to specific countries (empty for all)'
      },
      {
        key: 'preferredCountries',
        type: 'array',
        defaultValue: ['US', 'CA', 'GB'],
        description: 'Preferred countries in dropdown'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Contact information', 'User profiles', 'Emergency contacts', 'Business forms'],
    accessibility: {
      ariaLabel: 'Phone number input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'zipCode',
    name: 'ZIP Code',
    category: 'numeric',
    type: 'text',
    responseType: 'Text',
    description: 'Postal/ZIP code',
    icon: 'location',
    htmlType: 'text',
    component: 'ZipCodeInput',
    validationOptions: [
      {
        type: 'required',
        message: 'ZIP code is required'
      },
      {
        type: 'pattern',
        value: '^\\d{5}(-\\d{4})?$',
        message: 'Please enter a valid ZIP code'
      },
      {
        type: 'minLength',
        value: 5,
        message: 'ZIP code must be at least 5 digits'
      },
      {
        type: 'maxLength',
        value: 10,
        message: 'ZIP code is too long'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: '12345',
        description: 'Placeholder text for the field'
      },
      {
        key: 'country',
        type: 'string',
        defaultValue: 'US',
        description: 'Country for ZIP code format',
        options: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN']
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: 'US',
        description: 'ZIP code format',
        options: ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN', 'Custom']
      },
      {
        key: 'allowPlus4',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow ZIP+4 format (12345-6789)'
      },
      {
        key: 'autoFormat',
        type: 'boolean',
        defaultValue: true,
        description: 'Auto-format as user types'
      },
      {
        key: 'validateAgainstDatabase',
        type: 'boolean',
        defaultValue: false,
        description: 'Validate against postal database'
      },
      {
        key: 'customPattern',
        type: 'string',
        defaultValue: '',
        description: 'Custom regex pattern for validation'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Address forms', 'Shipping', 'Demographics', 'Location services'],
    accessibility: {
      ariaLabel: 'ZIP code input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const NUMERIC_FIELD_CATEGORY: FieldCategory = 'numeric';
