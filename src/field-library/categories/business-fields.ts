/**
 * Business & Professional field definitions
 * Category: Business & Professional Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const BUSINESS_FIELDS: FieldDefinition[] = [
  {
    id: 'companySize',
    name: 'Company Size',
    category: 'business-professional',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Employee count ranges',
    icon: 'building',
    htmlType: 'select',
    component: 'CompanySizeSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Company size is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select company size...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'ranges',
        type: 'array',
        defaultValue: [
          { value: '1-10', label: '1-10 employees' },
          { value: '11-50', label: '11-50 employees' },
          { value: '51-200', label: '51-200 employees' },
          { value: '201-500', label: '201-500 employees' },
          { value: '501-1000', label: '501-1,000 employees' },
          { value: '1001-5000', label: '1,001-5,000 employees' },
          { value: '5000+', label: '5,000+ employees' }
        ],
        description: 'Company size ranges'
      },
      {
        key: 'customRanges',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow custom range definition'
      },
      {
        key: 'includeUnknown',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "Unknown" option'
      },
      {
        key: 'sortOrder',
        type: 'string',
        defaultValue: 'ascending',
        description: 'Sort order for ranges',
        options: ['ascending', 'descending', 'custom']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['B2B forms', 'Market research', 'Lead qualification', 'Business surveys'],
    accessibility: {
      ariaLabel: 'Company size selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'industry',
    name: 'Industry',
    category: 'business-professional',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Business industry',
    icon: 'industry',
    htmlType: 'select',
    component: 'IndustrySelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Industry is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select industry...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'classification',
        type: 'string',
        defaultValue: 'NAICS',
        description: 'Industry classification system',
        options: ['NAICS', 'SIC', 'GICS', 'custom']
      },
      {
        key: 'hierarchical',
        type: 'boolean',
        defaultValue: true,
        description: 'Use hierarchical industry structure'
      },
      {
        key: 'levels',
        type: 'number',
        defaultValue: 3,
        description: 'Number of hierarchy levels',
        min: 1,
        max: 6
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      },
      {
        key: 'includeOther',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "Other" option'
      },
      {
        key: 'otherLabel',
        type: 'string',
        defaultValue: 'Other',
        description: 'Label for "Other" option'
      },
      {
        key: 'customIndustries',
        type: 'array',
        defaultValue: [],
        description: 'Custom industry options'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Market research', 'Lead qualification', 'Business registration', 'Industry analysis'],
    accessibility: {
      ariaLabel: 'Industry selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'revenue',
    name: 'Revenue',
    category: 'business-professional',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Annual revenue ranges',
    icon: 'dollar-sign',
    htmlType: 'select',
    component: 'RevenueSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Revenue range is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select revenue range...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'currency',
        type: 'string',
        defaultValue: 'USD',
        description: 'Currency for revenue ranges',
        options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']
      },
      {
        key: 'ranges',
        type: 'array',
        defaultValue: [
          { value: '0-100k', label: '$0 - $100K' },
          { value: '100k-500k', label: '$100K - $500K' },
          { value: '500k-1m', label: '$500K - $1M' },
          { value: '1m-5m', label: '$1M - $5M' },
          { value: '5m-10m', label: '$5M - $10M' },
          { value: '10m-50m', label: '$10M - $50M' },
          { value: '50m+', label: '$50M+' }
        ],
        description: 'Revenue ranges'
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: 'short',
        description: 'Number format',
        options: ['short', 'long', 'scientific']
      },
      {
        key: 'includeUnknown',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "Unknown" option'
      },
      {
        key: 'includePreferNotToSay',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "Prefer not to say" option'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Business qualification', 'Market research', 'Lead scoring', 'Financial analysis'],
    accessibility: {
      ariaLabel: 'Revenue range selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'businessType',
    name: 'Business Type',
    category: 'business-professional',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Legal structure',
    icon: 'briefcase',
    htmlType: 'select',
    component: 'BusinessTypeSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Business type is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select business type...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'jurisdiction',
        type: 'string',
        defaultValue: 'US',
        description: 'Legal jurisdiction',
        options: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN']
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
          { value: 'partnership', label: 'Partnership' },
          { value: 'llc', label: 'Limited Liability Company (LLC)' },
          { value: 'corporation', label: 'Corporation' },
          { value: 's-corp', label: 'S-Corporation' },
          { value: 'c-corp', label: 'C-Corporation' },
          { value: 'nonprofit', label: 'Non-Profit' },
          { value: 'cooperative', label: 'Cooperative' }
        ],
        description: 'Business type options'
      },
      {
        key: 'includeOther',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "Other" option'
      },
      {
        key: 'otherLabel',
        type: 'string',
        defaultValue: 'Other',
        description: 'Label for "Other" option'
      },
      {
        key: 'showDescriptions',
        type: 'boolean',
        defaultValue: false,
        description: 'Show business type descriptions'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Registration', 'Legal forms', 'Business applications', 'Tax forms'],
    accessibility: {
      ariaLabel: 'Business type selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'jobTitle',
    name: 'Job Title',
    category: 'business-professional',
    type: 'text',
    responseType: 'Text',
    description: 'Professional title',
    icon: 'user-tie',
    htmlType: 'text',
    component: 'JobTitleInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Job title is required'
      },
      {
        type: 'minLength',
        value: 2,
        message: 'Job title must be at least 2 characters'
      },
      {
        type: 'maxLength',
        value: 100,
        message: 'Job title must be no more than 100 characters'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter your job title...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'suggestions',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable job title suggestions'
      },
      {
        key: 'suggestionSource',
        type: 'string',
        defaultValue: 'built-in',
        description: 'Source for suggestions',
        options: ['built-in', 'api', 'custom']
      },
      {
        key: 'hierarchy',
        type: 'boolean',
        defaultValue: false,
        description: 'Show job title hierarchy'
      },
      {
        key: 'department',
        type: 'string',
        defaultValue: '',
        description: 'Filter by department'
      },
      {
        key: 'level',
        type: 'string',
        defaultValue: '',
        description: 'Filter by seniority level',
        options: ['entry', 'mid', 'senior', 'executive', 'all']
      },
      {
        key: 'maxLength',
        type: 'number',
        defaultValue: 100,
        description: 'Maximum length',
        min: 10,
        max: 200
      },
      {
        key: 'minLength',
        type: 'number',
        defaultValue: 2,
        description: 'Minimum length',
        min: 1,
        max: 50
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['HR forms', 'Professional profiles', 'Contact forms', 'Employee records'],
    accessibility: {
      ariaLabel: 'Job title input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'department',
    name: 'Department',
    category: 'business-professional',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Company department',
    icon: 'sitemap',
    htmlType: 'select',
    component: 'DepartmentSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Department is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select department...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'engineering', label: 'Engineering' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'sales', label: 'Sales' },
          { value: 'hr', label: 'Human Resources' },
          { value: 'finance', label: 'Finance' },
          { value: 'operations', label: 'Operations' },
          { value: 'customer-service', label: 'Customer Service' },
          { value: 'product', label: 'Product' },
          { value: 'design', label: 'Design' },
          { value: 'legal', label: 'Legal' }
        ],
        description: 'Department options'
      },
      {
        key: 'customizable',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow custom department entries'
      },
      {
        key: 'hierarchical',
        type: 'boolean',
        defaultValue: false,
        description: 'Use hierarchical department structure'
      },
      {
        key: 'includeOther',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "Other" option'
      },
      {
        key: 'otherLabel',
        type: 'string',
        defaultValue: 'Other',
        description: 'Label for "Other" option'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Internal forms', 'Employee management', 'Organizational charts', 'Resource allocation'],
    accessibility: {
      ariaLabel: 'Department selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'workExperience',
    name: 'Work Experience',
    category: 'business-professional',
    type: 'number',
    responseType: 'Integer',
    description: 'Years of experience',
    icon: 'clock',
    htmlType: 'number',
    component: 'WorkExperienceInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Work experience is required'
      },
      {
        type: 'min',
        value: 0,
        message: 'Experience must be at least 0 years'
      },
      {
        type: 'max',
        value: 50,
        message: 'Experience must be no more than 50 years'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter years of experience...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum years of experience',
        min: 0,
        max: 10
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 50,
        description: 'Maximum years of experience',
        min: 10,
        max: 100
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 0.5,
        description: 'Step increment in years',
        min: 0.1,
        max: 1
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 1,
        description: 'Number of decimal places',
        min: 0,
        max: 2
      },
      {
        key: 'unit',
        type: 'string',
        defaultValue: 'years',
        description: 'Unit of measurement',
        options: ['years', 'months', 'both']
      },
      {
        key: 'showRanges',
        type: 'boolean',
        defaultValue: false,
        description: 'Show experience level ranges'
      },
      {
        key: 'ranges',
        type: 'array',
        defaultValue: [
          { min: 0, max: 2, label: 'Entry Level' },
          { min: 2, max: 5, label: 'Mid Level' },
          { min: 5, max: 10, label: 'Senior Level' },
          { min: 10, max: 50, label: 'Expert Level' }
        ],
        description: 'Experience level ranges'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Job applications', 'Resume forms', 'Professional profiles', 'Skill assessments'],
    accessibility: {
      ariaLabel: 'Work experience input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'skills',
    name: 'Skills',
    category: 'business-professional',
    type: 'multi-select',
    responseType: 'MultiChoiceSelection',
    description: 'Professional skills',
    icon: 'cogs',
    htmlType: 'select',
    component: 'SkillsSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'At least one skill is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select skills...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'categories',
        type: 'array',
        defaultValue: [
          'Technical Skills',
          'Soft Skills',
          'Languages',
          'Certifications',
          'Tools & Software'
        ],
        description: 'Skill categories'
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'javascript', label: 'JavaScript', category: 'Technical Skills' },
          { value: 'python', label: 'Python', category: 'Technical Skills' },
          { value: 'leadership', label: 'Leadership', category: 'Soft Skills' },
          { value: 'communication', label: 'Communication', category: 'Soft Skills' },
          { value: 'english', label: 'English', category: 'Languages' },
          { value: 'spanish', label: 'Spanish', category: 'Languages' }
        ],
        description: 'Skill options'
      },
      {
        key: 'maxSelections',
        type: 'number',
        defaultValue: 20,
        description: 'Maximum number of skills',
        min: 1,
        max: 100
      },
      {
        key: 'minSelections',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum number of skills',
        min: 1,
        max: 10
      },
      {
        key: 'allowCustom',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow custom skill entries'
      },
      {
        key: 'customLabel',
        type: 'string',
        defaultValue: 'Other (specify)',
        description: 'Label for custom skill option'
      },
      {
        key: 'proficiencyLevels',
        type: 'boolean',
        defaultValue: false,
        description: 'Include proficiency levels'
      },
      {
        key: 'proficiencyOptions',
        type: 'array',
        defaultValue: [
          { value: 'beginner', label: 'Beginner' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' },
          { value: 'expert', label: 'Expert' }
        ],
        description: 'Proficiency level options'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Recruitment', 'Professional profiles', 'Skill assessments', 'Team building'],
    accessibility: {
      ariaLabel: 'Skills selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const BUSINESS_FIELD_CATEGORY: FieldCategory = 'business-professional';
