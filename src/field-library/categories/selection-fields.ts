/**
 * Selection & Choice field definitions
 * Category: Selection & Choice Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const SELECTION_FIELDS: FieldDefinition[] = [
  // Single Selection Fields
  {
    id: 'radio',
    name: 'Radio Buttons',
    category: 'selection-choice',
    type: 'radio',
    responseType: 'SingleChoiceSelection',
    description: 'Single option selection',
    icon: 'radio',
    htmlType: 'radio',
    component: 'RadioGroup',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select an option'
      }
    ],
    configurationOptions: [
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ],
        description: 'Available options for selection'
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'vertical',
        description: 'Layout orientation',
        options: ['vertical', 'horizontal', 'grid']
      },
      {
        key: 'allowOther',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow "Other" option with text input'
      },
      {
        key: 'otherLabel',
        type: 'string',
        defaultValue: 'Other',
        description: 'Label for "Other" option'
      },
      {
        key: 'otherPlaceholder',
        type: 'string',
        defaultValue: 'Please specify...',
        description: 'Placeholder for "Other" text input'
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Size of radio buttons',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'disabled',
        type: 'array',
        defaultValue: [],
        description: 'Disabled option values'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Gender', 'Preferences', 'Yes/No questions', 'Single choice surveys'],
    accessibility: {
      ariaLabel: 'Radio button group',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    category: 'selection-choice',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Dropdown menu selection',
    icon: 'dropdown',
    htmlType: 'select',
    component: 'Select',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select an option'
      }
    ],
    configurationOptions: [
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ],
        description: 'Available options for selection'
      },
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select an option...',
        description: 'Placeholder text for the dropdown'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable search functionality'
      },
      {
        key: 'clearable',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow clearing the selection'
      },
      {
        key: 'multiple',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow multiple selections'
      },
      {
        key: 'maxSelections',
        type: 'number',
        defaultValue: 1,
        description: 'Maximum number of selections allowed',
        min: 1,
        max: 10
      },
      {
        key: 'grouped',
        type: 'boolean',
        defaultValue: false,
        description: 'Group options by category'
      },
      {
        key: 'loading',
        type: 'boolean',
        defaultValue: false,
        description: 'Show loading state'
      },
      {
        key: 'async',
        type: 'boolean',
        defaultValue: false,
        description: 'Load options asynchronously'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Countries', 'Categories', 'Status selection', 'Filter options'],
    accessibility: {
      ariaLabel: 'Dropdown selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'imageChoice',
    name: 'Image Choice',
    category: 'selection-choice',
    type: 'radio',
    responseType: 'SingleChoiceSelection',
    description: 'Choice with images',
    icon: 'image-choice',
    htmlType: 'radio',
    component: 'ImageChoice',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select an option'
      }
    ],
    configurationOptions: [
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'option1', label: 'Option 1', imageUrl: 'https://example.com/image1.jpg' },
          { value: 'option2', label: 'Option 2', imageUrl: 'https://example.com/image2.jpg' }
        ],
        description: 'Options with images'
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'grid',
        description: 'Layout of image choices',
        options: ['grid', 'horizontal', 'vertical']
      },
      {
        key: 'imageSize',
        type: 'string',
        defaultValue: 'medium',
        description: 'Size of images',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show labels below images'
      },
      {
        key: 'allowZoom',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow image zoom on hover'
      },
      {
        key: 'aspectRatio',
        type: 'string',
        defaultValue: '1:1',
        description: 'Image aspect ratio',
        options: ['1:1', '4:3', '16:9', '3:2', 'free']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Product selection', 'Visual preferences', 'Style choices', 'Color selection'],
    accessibility: {
      ariaLabel: 'Image choice selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'buttonGroup',
    name: 'Button Group',
    category: 'selection-choice',
    type: 'radio',
    responseType: 'SingleChoiceSelection',
    description: 'Button-style selection',
    icon: 'button-group',
    htmlType: 'radio',
    component: 'ButtonGroup',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select an option'
      }
    ],
    configurationOptions: [
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ],
        description: 'Available button options'
      },
      {
        key: 'variant',
        type: 'string',
        defaultValue: 'outlined',
        description: 'Button style variant',
        options: ['contained', 'outlined', 'text']
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Button size',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'color',
        type: 'string',
        defaultValue: 'primary',
        description: 'Button color theme',
        options: ['primary', 'secondary', 'success', 'warning', 'error', 'info']
      },
      {
        key: 'fullWidth',
        type: 'boolean',
        defaultValue: false,
        description: 'Make buttons full width'
      },
      {
        key: 'allowDeselect',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow deselecting the current option'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Priority levels', 'Ratings', 'Quick selections', 'Status indicators'],
    accessibility: {
      ariaLabel: 'Button group selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  // Multiple Selection Fields
  {
    id: 'checkbox',
    name: 'Checkboxes',
    category: 'selection-choice',
    type: 'checkbox',
    responseType: 'MultiChoiceSelection',
    description: 'Multiple option selection',
    icon: 'checkbox',
    htmlType: 'checkbox',
    component: 'CheckboxGroup',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select at least one option'
      }
    ],
    configurationOptions: [
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ],
        description: 'Available options for selection'
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'vertical',
        description: 'Layout orientation',
        options: ['vertical', 'horizontal', 'grid']
      },
      {
        key: 'minSelections',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum number of selections required',
        min: 0,
        max: 10
      },
      {
        key: 'maxSelections',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of selections allowed',
        min: 1,
        max: 50
      },
      {
        key: 'allowSelectAll',
        type: 'boolean',
        defaultValue: false,
        description: 'Show "Select All" option'
      },
      {
        key: 'selectAllLabel',
        type: 'string',
        defaultValue: 'Select All',
        description: 'Label for "Select All" option'
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Size of checkboxes',
        options: ['small', 'medium', 'large']
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Skills', 'Interests', 'Features', 'Multiple choice surveys'],
    accessibility: {
      ariaLabel: 'Checkbox group selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'multiSelect',
    name: 'Multi-Select',
    category: 'selection-choice',
    type: 'multi-select',
    responseType: 'MultiChoiceSelection',
    description: 'Multi-select dropdown',
    icon: 'multi-select',
    htmlType: 'select',
    component: 'MultiSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select at least one option'
      }
    ],
    configurationOptions: [
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ],
        description: 'Available options for selection'
      },
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select options...',
        description: 'Placeholder text for the dropdown'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      },
      {
        key: 'clearable',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow clearing all selections'
      },
      {
        key: 'maxSelections',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of selections allowed',
        min: 1,
        max: 100
      },
      {
        key: 'minSelections',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum number of selections required',
        min: 0,
        max: 10
      },
      {
        key: 'showSelectedCount',
        type: 'boolean',
        defaultValue: true,
        description: 'Show count of selected items'
      },
      {
        key: 'closeOnSelect',
        type: 'boolean',
        defaultValue: false,
        description: 'Close dropdown after each selection'
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Tags', 'Categories', 'Participants', 'Multiple selections'],
    accessibility: {
      ariaLabel: 'Multi-select dropdown field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'tagInput',
    name: 'Tag Input',
    category: 'selection-choice',
    type: 'tags',
    responseType: 'TextArray',
    description: 'Tag-style input',
    icon: 'tags',
    htmlType: 'text',
    component: 'TagInput',
    validationOptions: [
      {
        type: 'maxLength',
        value: 50,
        message: 'Tag is too long'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Add tags...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'predefinedTags',
        type: 'array',
        defaultValue: [],
        description: 'Predefined tag suggestions'
      },
      {
        key: 'allowCustomTags',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow custom tag creation'
      },
      {
        key: 'maxTags',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of tags allowed',
        min: 1,
        max: 100
      },
      {
        key: 'minTags',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum number of tags required',
        min: 0,
        max: 10
      },
      {
        key: 'duplicateTags',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow duplicate tags'
      },
      {
        key: 'tagValidation',
        type: 'string',
        defaultValue: '^[a-zA-Z0-9\\s\\-_]+$',
        description: 'Regex pattern for tag validation'
      },
      {
        key: 'separator',
        type: 'string',
        defaultValue: ',',
        description: 'Character to separate tags',
        options: [',', ';', '|', ' ']
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Skills', 'Keywords', 'Labels', 'Categories'],
    accessibility: {
      ariaLabel: 'Tag input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'imageMultiChoice',
    name: 'Image Multi-Choice',
    category: 'selection-choice',
    type: 'checkbox',
    responseType: 'MultiChoiceSelection',
    description: 'Multiple image selection',
    icon: 'image-multi-choice',
    htmlType: 'checkbox',
    component: 'ImageMultiChoice',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select at least one option'
      }
    ],
    configurationOptions: [
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'option1', label: 'Option 1', imageUrl: 'https://example.com/image1.jpg' },
          { value: 'option2', label: 'Option 2', imageUrl: 'https://example.com/image2.jpg' }
        ],
        description: 'Options with images'
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'grid',
        description: 'Layout of image choices',
        options: ['grid', 'horizontal', 'vertical']
      },
      {
        key: 'imageSize',
        type: 'string',
        defaultValue: 'medium',
        description: 'Size of images',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'maxSelections',
        type: 'number',
        defaultValue: 5,
        description: 'Maximum number of selections allowed',
        min: 1,
        max: 20
      },
      {
        key: 'minSelections',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum number of selections required',
        min: 0,
        max: 10
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show labels below images'
      },
      {
        key: 'allowZoom',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow image zoom on hover'
      },
      {
        key: 'selectionLimit',
        type: 'boolean',
        defaultValue: true,
        description: 'Show selection limit indicator'
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Gallery selection', 'Features', 'Multiple visual choices', 'Product variants'],
    accessibility: {
      ariaLabel: 'Image multi-choice selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const SELECTION_FIELD_CATEGORY: FieldCategory = 'selection-choice';
