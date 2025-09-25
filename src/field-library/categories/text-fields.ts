/**
 * Text-based field definitions
 * Category: Text-Based Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const TEXT_FIELDS: FieldDefinition[] = [
  {
    id: 'shortText',
    name: 'Short Text',
    category: 'text-based',
    type: 'text',
    responseType: 'Text',
    description: 'Single line text input',
    icon: 'text',
    htmlType: 'text',
    component: 'TextInput',
    validationOptions: [
      {
        type: 'required',
        message: 'This field is required'
      },
      {
        type: 'minLength',
        value: 1,
        message: 'Must be at least {min} characters long'
      },
      {
        type: 'maxLength',
        value: 255,
        message: 'Must be no more than {max} characters long'
      },
      {
        type: 'pattern',
        value: '^[a-zA-Z0-9\\s\\-_.,!?]*$',
        message: 'Invalid characters detected'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter text...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'maxLength',
        type: 'number',
        defaultValue: 255,
        description: 'Maximum number of characters allowed',
        min: 1,
        max: 1000
      },
      {
        key: 'minLength',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum number of characters required',
        min: 0,
        max: 100
      },
      {
        key: 'pattern',
        type: 'string',
        defaultValue: '',
        description: 'Regular expression pattern for validation'
      },
      {
        key: 'autocomplete',
        type: 'string',
        defaultValue: 'off',
        description: 'Autocomplete behavior',
        options: ['off', 'on', 'name', 'email', 'username', 'new-password', 'current-password']
      },
      {
        key: 'spellcheck',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable spell checking'
      },
      {
        key: 'autocapitalize',
        type: 'string',
        defaultValue: 'sentences',
        description: 'Automatic capitalization',
        options: ['off', 'on', 'sentences', 'words', 'characters']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Names', 'Titles', 'Short descriptions', 'Single-line inputs'],
    accessibility: {
      ariaLabel: 'Text input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'longText',
    name: 'Long Text',
    category: 'text-based',
    type: 'textarea',
    responseType: 'Text',
    description: 'Multi-line text input',
    icon: 'textarea',
    htmlType: 'textarea',
    component: 'TextArea',
    validationOptions: [
      {
        type: 'required',
        message: 'This field is required'
      },
      {
        type: 'minLength',
        value: 1,
        message: 'Must be at least {min} characters long'
      },
      {
        type: 'maxLength',
        value: 5000,
        message: 'Must be no more than {max} characters long'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter your text here...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'rows',
        type: 'number',
        defaultValue: 4,
        description: 'Number of visible text lines',
        min: 1,
        max: 20
      },
      {
        key: 'maxLength',
        type: 'number',
        defaultValue: 5000,
        description: 'Maximum number of characters allowed',
        min: 1,
        max: 50000
      },
      {
        key: 'minLength',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum number of characters required',
        min: 0,
        max: 1000
      },
      {
        key: 'resize',
        type: 'string',
        defaultValue: 'vertical',
        description: 'Resize behavior',
        options: ['none', 'both', 'horizontal', 'vertical']
      },
      {
        key: 'wordCount',
        type: 'boolean',
        defaultValue: false,
        description: 'Show word count'
      },
      {
        key: 'characterCount',
        type: 'boolean',
        defaultValue: true,
        description: 'Show character count'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Comments', 'Descriptions', 'Feedback', 'Long-form content'],
    accessibility: {
      ariaLabel: 'Multi-line text input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'email',
    name: 'Email',
    category: 'text-based',
    type: 'email',
    responseType: 'Email',
    description: 'Email address input',
    icon: 'email',
    htmlType: 'email',
    component: 'EmailInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Email address is required'
      },
      {
        type: 'email',
        message: 'Please enter a valid email address'
      },
      {
        type: 'maxLength',
        value: 254,
        message: 'Email address is too long'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter your email address...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'multiple',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow multiple email addresses'
      },
      {
        key: 'domainRestrictions',
        type: 'array',
        defaultValue: [],
        description: 'Allowed email domains (empty for all)'
      },
      {
        key: 'blockedDomains',
        type: 'array',
        defaultValue: [],
        description: 'Blocked email domains'
      },
      {
        key: 'verifyDomain',
        type: 'boolean',
        defaultValue: false,
        description: 'Verify domain exists'
      },
      {
        key: 'suggestions',
        type: 'boolean',
        defaultValue: true,
        description: 'Show email suggestions'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Contact forms', 'Registration', 'Newsletter signup', 'User accounts'],
    accessibility: {
      ariaLabel: 'Email address input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'password',
    name: 'Password',
    category: 'text-based',
    type: 'password',
    responseType: 'Password',
    description: 'Masked text input for passwords',
    icon: 'password',
    htmlType: 'password',
    component: 'PasswordInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Password is required'
      },
      {
        type: 'minLength',
        value: 8,
        message: 'Password must be at least {min} characters long'
      },
      {
        type: 'maxLength',
        value: 128,
        message: 'Password is too long'
      },
      {
        type: 'pattern',
        value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
        message: 'Password must contain uppercase, lowercase, number and special character'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter your password...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'minLength',
        type: 'number',
        defaultValue: 8,
        description: 'Minimum password length',
        min: 4,
        max: 32
      },
      {
        key: 'maxLength',
        type: 'number',
        defaultValue: 128,
        description: 'Maximum password length',
        min: 8,
        max: 256
      },
      {
        key: 'showStrength',
        type: 'boolean',
        defaultValue: true,
        description: 'Show password strength indicator'
      },
      {
        key: 'showToggle',
        type: 'boolean',
        defaultValue: true,
        description: 'Show password visibility toggle'
      },
      {
        key: 'requireUppercase',
        type: 'boolean',
        defaultValue: true,
        description: 'Require uppercase letters'
      },
      {
        key: 'requireLowercase',
        type: 'boolean',
        defaultValue: true,
        description: 'Require lowercase letters'
      },
      {
        key: 'requireNumbers',
        type: 'boolean',
        defaultValue: true,
        description: 'Require numbers'
      },
      {
        key: 'requireSpecialChars',
        type: 'boolean',
        defaultValue: true,
        description: 'Require special characters'
      },
      {
        key: 'confirmPassword',
        type: 'boolean',
        defaultValue: false,
        description: 'Include password confirmation field'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Account creation', 'Login forms', 'Password reset', 'Security settings'],
    accessibility: {
      ariaLabel: 'Password input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'url',
    name: 'URL',
    category: 'text-based',
    type: 'url',
    responseType: 'URL',
    description: 'Website URL input',
    icon: 'link',
    htmlType: 'url',
    component: 'UrlInput',
    validationOptions: [
      {
        type: 'required',
        message: 'URL is required'
      },
      {
        type: 'url',
        message: 'Please enter a valid URL'
      },
      {
        type: 'maxLength',
        value: 2048,
        message: 'URL is too long'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'https://example.com',
        description: 'Placeholder text for the field'
      },
      {
        key: 'allowedProtocols',
        type: 'array',
        defaultValue: ['http', 'https'],
        description: 'Allowed URL protocols',
        options: ['http', 'https', 'ftp', 'ftps', 'mailto', 'tel']
      },
      {
        key: 'requireProtocol',
        type: 'boolean',
        defaultValue: true,
        description: 'Require protocol in URL'
      },
      {
        key: 'autoComplete',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable URL autocomplete'
      },
      {
        key: 'preview',
        type: 'boolean',
        defaultValue: false,
        description: 'Show URL preview'
      },
      {
        key: 'shorten',
        type: 'boolean',
        defaultValue: false,
        description: 'Offer URL shortening'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Links', 'References', 'Portfolios', 'Social media profiles'],
    accessibility: {
      ariaLabel: 'URL input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'search',
    name: 'Search',
    category: 'text-based',
    type: 'search',
    responseType: 'Text',
    description: 'Search input with suggestions',
    icon: 'search',
    htmlType: 'search',
    component: 'SearchInput',
    validationOptions: [
      {
        type: 'maxLength',
        value: 100,
        message: 'Search term is too long'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Search...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'minLength',
        type: 'number',
        defaultValue: 2,
        description: 'Minimum characters before search',
        min: 1,
        max: 10
      },
      {
        key: 'maxSuggestions',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of suggestions',
        min: 1,
        max: 50
      },
      {
        key: 'debounceDelay',
        type: 'number',
        defaultValue: 300,
        description: 'Delay before triggering search (ms)',
        min: 100,
        max: 2000
      },
      {
        key: 'showHistory',
        type: 'boolean',
        defaultValue: true,
        description: 'Show search history'
      },
      {
        key: 'clearable',
        type: 'boolean',
        defaultValue: true,
        description: 'Show clear button'
      },
      {
        key: 'dataSource',
        type: 'string',
        defaultValue: '',
        description: 'Data source for suggestions'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Search forms', 'Lookup fields', 'Autocomplete', 'Filtering'],
    accessibility: {
      ariaLabel: 'Search input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'richText',
    name: 'Rich Text',
    category: 'text-based',
    type: 'richtext',
    responseType: 'RichText',
    description: 'WYSIWYG text editor',
    icon: 'rich-text',
    htmlType: 'text',
    component: 'RichTextEditor',
    validationOptions: [
      {
        type: 'required',
        message: 'Content is required'
      },
      {
        type: 'maxLength',
        value: 10000,
        message: 'Content is too long'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Start typing...',
        description: 'Placeholder text for the editor'
      },
      {
        key: 'toolbar',
        type: 'array',
        defaultValue: ['bold', 'italic', 'underline', 'link', 'list', 'quote'],
        description: 'Available toolbar buttons',
        options: ['bold', 'italic', 'underline', 'strikethrough', 'link', 'image', 'list', 'quote', 'code', 'table']
      },
      {
        key: 'maxLength',
        type: 'number',
        defaultValue: 10000,
        description: 'Maximum character count',
        min: 100,
        max: 100000
      },
      {
        key: 'height',
        type: 'number',
        defaultValue: 200,
        description: 'Editor height in pixels',
        min: 100,
        max: 800
      },
      {
        key: 'allowImages',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow image insertion'
      },
      {
        key: 'allowTables',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow table insertion'
      },
      {
        key: 'sanitizeHtml',
        type: 'boolean',
        defaultValue: true,
        description: 'Sanitize HTML content'
      },
      {
        key: 'allowedTags',
        type: 'array',
        defaultValue: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'blockquote'],
        description: 'Allowed HTML tags'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Articles', 'Detailed descriptions', 'Content management', 'Blog posts'],
    accessibility: {
      ariaLabel: 'Rich text editor',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const TEXT_FIELD_CATEGORY: FieldCategory = 'text-based';
