/**
 * Measurement field definitions
 * Category: Advanced Input Fields - Measurement Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const MEASUREMENT_FIELDS: FieldDefinition[] = [
  {
    id: 'height',
    name: 'Height',
    category: 'measurement',
    type: 'composite',
    responseType: 'Object',
    description: 'Height measurement',
    icon: 'material-symbols:height',
    htmlType: 'text',
    component: 'HeightInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Height is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter height...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'unit',
        type: 'string',
        defaultValue: 'cm',
        description: 'Default unit of measurement',
        options: ['cm', 'ft', 'in', 'm']
      },
      {
        key: 'units',
        type: 'array',
        defaultValue: ['cm', 'ft'],
        description: 'Available units',
        options: ['cm', 'ft', 'in', 'm', 'mm']
      },
      {
        key: 'minValue',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum height value'
      },
      {
        key: 'maxValue',
        type: 'number',
        defaultValue: 300,
        description: 'Maximum height value'
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
        key: 'showConversion',
        type: 'boolean',
        defaultValue: true,
        description: 'Show unit conversion'
      },
      {
        key: 'allowCustomUnit',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow custom unit input'
      },
      {
        key: 'predefinedValues',
        type: 'array',
        defaultValue: [],
        description: 'Predefined height values'
      }
    ],
    defaultValue: { value: 0, unit: 'cm' },
    required: false,
    useCases: ['Healthcare', 'Demographics', 'Fitness tracking', 'Clothing sizing'],
    accessibility: {
      ariaLabel: 'Height measurement field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'weight',
    name: 'Weight',
    category: 'measurement',
    type: 'composite',
    responseType: 'Object',
    description: 'Weight measurement',
    icon: 'material-symbols:monitor-weight',
    htmlType: 'text',
    component: 'WeightInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Weight is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter weight...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'unit',
        type: 'string',
        defaultValue: 'kg',
        description: 'Default unit of measurement',
        options: ['kg', 'lbs', 'g', 'oz']
      },
      {
        key: 'units',
        type: 'array',
        defaultValue: ['kg', 'lbs'],
        description: 'Available units',
        options: ['kg', 'lbs', 'g', 'oz', 'st']
      },
      {
        key: 'minValue',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum weight value'
      },
      {
        key: 'maxValue',
        type: 'number',
        defaultValue: 500,
        description: 'Maximum weight value'
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
        key: 'showConversion',
        type: 'boolean',
        defaultValue: true,
        description: 'Show unit conversion'
      },
      {
        key: 'showBMI',
        type: 'boolean',
        defaultValue: false,
        description: 'Show BMI calculation (requires height)'
      },
      {
        key: 'heightFieldId',
        type: 'string',
        defaultValue: '',
        description: 'Height field ID for BMI calculation'
      }
    ],
    defaultValue: { value: 0, unit: 'kg' },
    required: false,
    useCases: ['Healthcare', 'Shipping', 'Fitness tracking', 'Medical records'],
    accessibility: {
      ariaLabel: 'Weight measurement field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'temperature',
    name: 'Temperature',
    category: 'measurement',
    type: 'number',
    responseType: 'Float',
    description: 'Temperature input',
    icon: 'material-symbols:thermostat',
    htmlType: 'number',
    component: 'TemperatureInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Temperature is required'
      },
      {
        type: 'number',
        message: 'Please enter a valid temperature'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter temperature...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'unit',
        type: 'string',
        defaultValue: 'C',
        description: 'Default temperature unit',
        options: ['C', 'F', 'K']
      },
      {
        key: 'units',
        type: 'array',
        defaultValue: ['C', 'F'],
        description: 'Available temperature units',
        options: ['C', 'F', 'K']
      },
      {
        key: 'minValue',
        type: 'number',
        defaultValue: -50,
        description: 'Minimum temperature value'
      },
      {
        key: 'maxValue',
        type: 'number',
        defaultValue: 200,
        description: 'Maximum temperature value'
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
        key: 'showConversion',
        type: 'boolean',
        defaultValue: true,
        description: 'Show unit conversion'
      },
      {
        key: 'temperatureType',
        type: 'string',
        defaultValue: 'general',
        description: 'Temperature measurement type',
        options: ['general', 'body', 'weather', 'cooking', 'scientific']
      },
      {
        key: 'showColorIndicator',
        type: 'boolean',
        defaultValue: false,
        description: 'Show color temperature indicator'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Medical', 'Scientific', 'Weather', 'Cooking', 'Industrial'],
    accessibility: {
      ariaLabel: 'Temperature input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'distance',
    name: 'Distance',
    category: 'measurement',
    type: 'number',
    responseType: 'Float',
    description: 'Distance measurement',
    icon: 'material-symbols:straighten',
    htmlType: 'number',
    component: 'DistanceInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Distance is required'
      },
      {
        type: 'number',
        message: 'Please enter a valid distance'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter distance...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'unit',
        type: 'string',
        defaultValue: 'km',
        description: 'Default distance unit',
        options: ['km', 'mi', 'm', 'ft', 'yd', 'cm', 'mm']
      },
      {
        key: 'units',
        type: 'array',
        defaultValue: ['km', 'mi'],
        description: 'Available distance units',
        options: ['km', 'mi', 'm', 'ft', 'yd', 'cm', 'mm', 'in']
      },
      {
        key: 'minValue',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum distance value'
      },
      {
        key: 'maxValue',
        type: 'number',
        defaultValue: 10000,
        description: 'Maximum distance value'
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 2,
        description: 'Number of decimal places',
        min: 0,
        max: 3
      },
      {
        key: 'showConversion',
        type: 'boolean',
        defaultValue: true,
        description: 'Show unit conversion'
      },
      {
        key: 'precision',
        type: 'string',
        defaultValue: 'high',
        description: 'Measurement precision',
        options: ['low', 'medium', 'high']
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Logistics', 'Sports', 'Travel', 'Construction', 'Real estate'],
    accessibility: {
      ariaLabel: 'Distance measurement field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'area',
    name: 'Area',
    category: 'measurement',
    type: 'number',
    responseType: 'Float',
    description: 'Area measurement',
    icon: 'material-symbols:square-foot',
    htmlType: 'number',
    component: 'AreaInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Area is required'
      },
      {
        type: 'number',
        message: 'Please enter a valid area'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter area...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'unit',
        type: 'string',
        defaultValue: 'sqft',
        description: 'Default area unit',
        options: ['sqft', 'sqm', 'acre', 'hectare', 'sqin', 'sqcm']
      },
      {
        key: 'units',
        type: 'array',
        defaultValue: ['sqft', 'sqm'],
        description: 'Available area units',
        options: ['sqft', 'sqm', 'acre', 'hectare', 'sqin', 'sqcm', 'sqyd']
      },
      {
        key: 'minValue',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum area value'
      },
      {
        key: 'maxValue',
        type: 'number',
        defaultValue: 1000000,
        description: 'Maximum area value'
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 2,
        description: 'Number of decimal places',
        min: 0,
        max: 3
      },
      {
        key: 'showConversion',
        type: 'boolean',
        defaultValue: true,
        description: 'Show unit conversion'
      },
      {
        key: 'calculation',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable area calculation from dimensions'
      },
      {
        key: 'lengthFieldId',
        type: 'string',
        defaultValue: '',
        description: 'Length field ID for calculation'
      },
      {
        key: 'widthFieldId',
        type: 'string',
        defaultValue: '',
        description: 'Width field ID for calculation'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Real estate', 'Construction', 'Land surveying', 'Floor planning'],
    accessibility: {
      ariaLabel: 'Area measurement field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'volume',
    name: 'Volume',
    category: 'measurement',
    type: 'number',
    responseType: 'Float',
    description: 'Volume measurement',
    icon: 'material-symbols:cube-outline',
    htmlType: 'number',
    component: 'VolumeInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Volume is required'
      },
      {
        type: 'number',
        message: 'Please enter a valid volume'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter volume...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'unit',
        type: 'string',
        defaultValue: 'L',
        description: 'Default volume unit',
        options: ['L', 'gal', 'ml', 'fl oz', 'cup', 'pint', 'quart']
      },
      {
        key: 'units',
        type: 'array',
        defaultValue: ['L', 'gal'],
        description: 'Available volume units',
        options: ['L', 'gal', 'ml', 'fl oz', 'cup', 'pint', 'quart', 'liter']
      },
      {
        key: 'minValue',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum volume value'
      },
      {
        key: 'maxValue',
        type: 'number',
        defaultValue: 10000,
        description: 'Maximum volume value'
      },
      {
        key: 'decimalPlaces',
        type: 'number',
        defaultValue: 2,
        description: 'Number of decimal places',
        min: 0,
        max: 3
      },
      {
        key: 'showConversion',
        type: 'boolean',
        defaultValue: true,
        description: 'Show unit conversion'
      },
      {
        key: 'volumeType',
        type: 'string',
        defaultValue: 'general',
        description: 'Volume measurement type',
        options: ['general', 'liquid', 'solid', 'gas', 'cooking']
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Recipes', 'Containers', 'Chemical measurements', 'Liquid storage'],
    accessibility: {
      ariaLabel: 'Volume measurement field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const MEASUREMENT_FIELD_CATEGORY: FieldCategory = 'measurement';
