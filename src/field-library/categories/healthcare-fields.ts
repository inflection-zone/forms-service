/**
 * Healthcare field definitions
 * Category: Healthcare-Specific Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const HEALTHCARE_FIELDS: FieldDefinition[] = [
  // Vital Signs
  {
    id: 'bloodPressure',
    name: 'Blood Pressure',
    category: 'healthcare',
    type: 'composite',
    responseType: 'Object',
    description: 'Systolic/Diastolic BP',
    icon: 'material-symbols:monitor-heart',
    htmlType: 'text',
    component: 'BloodPressureInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Blood pressure is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter blood pressure...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'units',
        type: 'string',
        defaultValue: 'mmHg',
        description: 'Blood pressure units',
        options: ['mmHg', 'kPa']
      },
      {
        key: 'systolicMin',
        type: 'number',
        defaultValue: 70,
        description: 'Minimum systolic value',
        min: 50,
        max: 300
      },
      {
        key: 'systolicMax',
        type: 'number',
        defaultValue: 200,
        description: 'Maximum systolic value',
        min: 100,
        max: 300
      },
      {
        key: 'diastolicMin',
        type: 'number',
        defaultValue: 40,
        description: 'Minimum diastolic value',
        min: 30,
        max: 150
      },
      {
        key: 'diastolicMax',
        type: 'number',
        defaultValue: 120,
        description: 'Maximum diastolic value',
        min: 50,
        max: 150
      },
      {
        key: 'normalRanges',
        type: 'object',
        defaultValue: { systolic: [90, 120], diastolic: [60, 80] },
        description: 'Normal blood pressure ranges'
      },
      {
        key: 'showWarning',
        type: 'boolean',
        defaultValue: true,
        description: 'Show warning for abnormal values'
      },
      {
        key: 'separator',
        type: 'string',
        defaultValue: '/',
        description: 'Separator between systolic and diastolic'
      }
    ],
    defaultValue: { systolic: '', diastolic: '' },
    required: false,
    useCases: ['Medical forms', 'Health monitoring', 'Vital signs tracking', 'Patient records'],
    accessibility: {
      ariaLabel: 'Blood pressure input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'pulseRate',
    name: 'Pulse Rate',
    category: 'healthcare',
    type: 'number',
    responseType: 'Integer',
    description: 'Heart rate measurement',
    icon: 'material-symbols:favorite',
    htmlType: 'number',
    component: 'PulseRateInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Pulse rate is required'
      },
      {
        type: 'min',
        value: 30,
        message: 'Pulse rate must be at least 30 bpm'
      },
      {
        type: 'max',
        value: 220,
        message: 'Pulse rate must be no more than 220 bpm'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter pulse rate...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'units',
        type: 'string',
        defaultValue: 'bpm',
        description: 'Pulse rate units',
        options: ['bpm', 'beats/min']
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 30,
        description: 'Minimum pulse rate',
        min: 20,
        max: 100
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 220,
        description: 'Maximum pulse rate',
        min: 100,
        max: 300
      },
      {
        key: 'normalRange',
        type: 'object',
        defaultValue: { min: 60, max: 100 },
        description: 'Normal pulse rate range'
      },
      {
        key: 'showWarning',
        type: 'boolean',
        defaultValue: true,
        description: 'Show warning for abnormal values'
      },
      {
        key: 'ageDependent',
        type: 'boolean',
        defaultValue: false,
        description: 'Adjust ranges based on age'
      },
      {
        key: 'ageFieldId',
        type: 'string',
        defaultValue: '',
        description: 'Age field ID for dependent ranges'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Health monitoring', 'Vital signs', 'Fitness tracking', 'Medical assessment'],
    accessibility: {
      ariaLabel: 'Pulse rate input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'bloodSugar',
    name: 'Blood Sugar',
    category: 'healthcare',
    type: 'number',
    responseType: 'Float',
    description: 'Glucose levels',
    icon: 'material-symbols:water-drop',
    htmlType: 'number',
    component: 'BloodSugarInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Blood sugar level is required'
      },
      {
        type: 'min',
        value: 0,
        message: 'Blood sugar must be at least 0'
      },
      {
        type: 'max',
        value: 1000,
        message: 'Blood sugar must be no more than 1000'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter blood sugar level...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'units',
        type: 'string',
        defaultValue: 'mg/dL',
        description: 'Blood sugar units',
        options: ['mg/dL', 'mmol/L']
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum blood sugar value',
        min: 0,
        max: 100
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 1000,
        description: 'Maximum blood sugar value',
        min: 100,
        max: 2000
      },
      {
        key: 'normalRange',
        type: 'object',
        defaultValue: { min: 70, max: 140 },
        description: 'Normal blood sugar range'
      },
      {
        key: 'fastingStatus',
        type: 'boolean',
        defaultValue: false,
        description: 'Require fasting status'
      },
      {
        key: 'showWarning',
        type: 'boolean',
        defaultValue: true,
        description: 'Show warning for abnormal values'
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 1,
        description: 'Number of decimal places',
        min: 0,
        max: 2
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Diabetes management', 'Health monitoring', 'Medical records', 'Glucose tracking'],
    accessibility: {
      ariaLabel: 'Blood sugar input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'oxygenSaturation',
    name: 'Oxygen Saturation',
    category: 'healthcare',
    type: 'number',
    responseType: 'Float',
    description: 'Blood oxygen levels',
    icon: 'material-symbols:air',
    htmlType: 'number',
    component: 'OxygenSaturationInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Oxygen saturation is required'
      },
      {
        type: 'min',
        value: 70,
        message: 'Oxygen saturation must be at least 70%'
      },
      {
        type: 'max',
        value: 100,
        message: 'Oxygen saturation must be no more than 100%'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter oxygen saturation...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'units',
        type: 'string',
        defaultValue: '%',
        description: 'Oxygen saturation units',
        options: ['%', 'percent']
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 70,
        description: 'Minimum oxygen saturation',
        min: 50,
        max: 95
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 100,
        description: 'Maximum oxygen saturation',
        min: 95,
        max: 100
      },
      {
        key: 'normalRange',
        type: 'object',
        defaultValue: { min: 95, max: 100 },
        description: 'Normal oxygen saturation range'
      },
      {
        key: 'showWarning',
        type: 'boolean',
        defaultValue: true,
        description: 'Show warning for abnormal values'
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 1,
        description: 'Number of decimal places',
        min: 0,
        max: 2
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Medical assessment', 'Respiratory monitoring', 'Health tracking', 'Vital signs'],
    accessibility: {
      ariaLabel: 'Oxygen saturation input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'respiratoryRate',
    name: 'Respiratory Rate',
    category: 'healthcare',
    type: 'number',
    responseType: 'Integer',
    description: 'Breathing rate',
    icon: 'material-symbols:air',
    htmlType: 'number',
    component: 'RespiratoryRateInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Respiratory rate is required'
      },
      {
        type: 'min',
        value: 8,
        message: 'Respiratory rate must be at least 8 breaths/min'
      },
      {
        type: 'max',
        value: 40,
        message: 'Respiratory rate must be no more than 40 breaths/min'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter respiratory rate...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'units',
        type: 'string',
        defaultValue: 'breaths/min',
        description: 'Respiratory rate units',
        options: ['breaths/min', 'bpm', 'breaths per minute']
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 8,
        description: 'Minimum respiratory rate',
        min: 5,
        max: 20
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 40,
        description: 'Maximum respiratory rate',
        min: 20,
        max: 60
      },
      {
        key: 'normalRange',
        type: 'object',
        defaultValue: { min: 12, max: 20 },
        description: 'Normal respiratory rate range'
      },
      {
        key: 'showWarning',
        type: 'boolean',
        defaultValue: true,
        description: 'Show warning for abnormal values'
      },
      {
        key: 'ageDependent',
        type: 'boolean',
        defaultValue: true,
        description: 'Adjust ranges based on age'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Vital signs', 'Respiratory monitoring', 'Medical assessment', 'Health tracking'],
    accessibility: {
      ariaLabel: 'Respiratory rate input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'bmi',
    name: 'BMI',
    category: 'healthcare',
    type: 'calculated',
    responseType: 'Float',
    description: 'Body Mass Index',
    icon: 'material-symbols:monitor-weight',
    htmlType: 'number',
    component: 'BMIInput',
    validationOptions: [
      {
        type: 'required',
        message: 'BMI calculation is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'BMI will be calculated...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'heightFieldId',
        type: 'string',
        defaultValue: '',
        description: 'Height field ID for calculation'
      },
      {
        key: 'weightFieldId',
        type: 'string',
        defaultValue: '',
        description: 'Weight field ID for calculation'
      },
      {
        key: 'formula',
        type: 'string',
        defaultValue: 'weight / (height * height)',
        description: 'BMI calculation formula'
      },
      {
        key: 'units',
        type: 'string',
        defaultValue: 'kg/m²',
        description: 'BMI units',
        options: ['kg/m²', 'lb/in²']
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
        key: 'showCategories',
        type: 'boolean',
        defaultValue: true,
        description: 'Show BMI categories'
      },
      {
        key: 'categories',
        type: 'object',
        defaultValue: {
          underweight: { min: 0, max: 18.5, label: 'Underweight' },
          normal: { min: 18.5, max: 25, label: 'Normal' },
          overweight: { min: 25, max: 30, label: 'Overweight' },
          obese: { min: 30, max: 100, label: 'Obese' }
        },
        description: 'BMI categories'
      },
      {
        key: 'readonly',
        type: 'boolean',
        defaultValue: true,
        description: 'Make BMI field read-only'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Health assessment', 'Fitness tracking', 'Medical records', 'Weight management'],
    accessibility: {
      ariaLabel: 'BMI calculation field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  // Medical Information
  {
    id: 'bloodType',
    name: 'Blood Type',
    category: 'healthcare',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Blood group selection',
    icon: 'material-symbols:water-drop',
    htmlType: 'select',
    component: 'BloodTypeSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Blood type is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select blood type...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'system',
        type: 'string',
        defaultValue: 'ABO',
        description: 'Blood type system',
        options: ['ABO', 'ABO-Rh', 'custom']
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'A+', label: 'A+' },
          { value: 'A-', label: 'A-' },
          { value: 'B+', label: 'B+' },
          { value: 'B-', label: 'B-' },
          { value: 'AB+', label: 'AB+' },
          { value: 'AB-', label: 'AB-' },
          { value: 'O+', label: 'O+' },
          { value: 'O-', label: 'O-' }
        ],
        description: 'Blood type options'
      },
      {
        key: 'includeUnknown',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "Unknown" option'
      },
      {
        key: 'unknownLabel',
        type: 'string',
        defaultValue: 'Unknown',
        description: 'Label for unknown blood type'
      },
      {
        key: 'showFrequency',
        type: 'boolean',
        defaultValue: false,
        description: 'Show blood type frequency'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Medical records', 'Blood donation', 'Emergency forms', 'Patient intake'],
    accessibility: {
      ariaLabel: 'Blood type selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'allergies',
    name: 'Allergies',
    category: 'healthcare',
    type: 'multi-select',
    responseType: 'MultiChoiceSelection',
    description: 'Known allergies',
    icon: 'material-symbols:warning',
    htmlType: 'select',
    component: 'AllergiesSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Please indicate if you have any allergies'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select allergies...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'none', label: 'No known allergies' },
          { value: 'peanuts', label: 'Peanuts' },
          { value: 'tree-nuts', label: 'Tree Nuts' },
          { value: 'dairy', label: 'Dairy' },
          { value: 'eggs', label: 'Eggs' },
          { value: 'soy', label: 'Soy' },
          { value: 'wheat', label: 'Wheat' },
          { value: 'fish', label: 'Fish' },
          { value: 'shellfish', label: 'Shellfish' },
          { value: 'medications', label: 'Medications' },
          { value: 'environmental', label: 'Environmental' }
        ],
        description: 'Common allergy options'
      },
      {
        key: 'allowCustom',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow custom allergy entry'
      },
      {
        key: 'customLabel',
        type: 'string',
        defaultValue: 'Other (specify)',
        description: 'Label for custom allergy option'
      },
      {
        key: 'severityLevels',
        type: 'boolean',
        defaultValue: false,
        description: 'Include severity levels'
      },
      {
        key: 'severityOptions',
        type: 'array',
        defaultValue: [
          { value: 'mild', label: 'Mild' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'severe', label: 'Severe' },
          { value: 'life-threatening', label: 'Life-threatening' }
        ],
        description: 'Severity level options'
      },
      {
        key: 'maxSelections',
        type: 'number',
        defaultValue: 20,
        description: 'Maximum number of allergies',
        min: 1,
        max: 50
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Medical forms', 'Patient intake', 'Emergency information', 'Food service'],
    accessibility: {
      ariaLabel: 'Allergies selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const HEALTHCARE_FIELD_CATEGORY: FieldCategory = 'healthcare';
