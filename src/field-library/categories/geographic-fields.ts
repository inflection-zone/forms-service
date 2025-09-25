/**
 * Geographic field definitions
 * Category: Geographic Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const GEOGRAPHIC_FIELDS: FieldDefinition[] = [
  {
    id: 'address',
    name: 'Address',
    category: 'geographic',
    type: 'composite',
    responseType: 'Object',
    description: 'Complete address',
    icon: 'map-marker',
    htmlType: 'text',
    component: 'AddressInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Address is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter address...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'fields',
        type: 'array',
        defaultValue: ['street', 'city', 'state', 'zip', 'country'],
        description: 'Address fields to include',
        options: ['street', 'city', 'state', 'zip', 'country', 'apartment', 'building', 'landmark']
      },
      {
        key: 'country',
        type: 'string',
        defaultValue: 'US',
        description: 'Default country',
        options: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN']
      },
      {
        key: 'validation',
        type: 'string',
        defaultValue: 'basic',
        description: 'Address validation level',
        options: ['none', 'basic', 'standard', 'strict']
      },
      {
        key: 'autocomplete',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable address autocomplete'
      },
      {
        key: 'geocoding',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable geocoding for coordinates'
      },
      {
        key: 'showMap',
        type: 'boolean',
        defaultValue: false,
        description: 'Show map preview'
      },
      {
        key: 'requiredFields',
        type: 'array',
        defaultValue: ['street', 'city', 'zip'],
        description: 'Required address fields'
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: 'US',
        description: 'Address format',
        options: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN', 'custom']
      }
    ],
    defaultValue: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    required: false,
    useCases: ['Shipping', 'Contact forms', 'User profiles', 'Business listings'],
    accessibility: {
      ariaLabel: 'Address input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'location',
    name: 'Location',
    category: 'geographic',
    type: 'location',
    responseType: 'Object',
    description: 'GPS coordinates',
    icon: 'location',
    htmlType: 'text',
    component: 'LocationInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Location is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select location...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'mapIntegration',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable map integration'
      },
      {
        key: 'mapProvider',
        type: 'string',
        defaultValue: 'google',
        description: 'Map provider',
        options: ['google', 'mapbox', 'openstreetmap', 'here']
      },
      {
        key: 'radiusSearch',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable radius search'
      },
      {
        key: 'searchRadius',
        type: 'number',
        defaultValue: 10,
        description: 'Search radius in kilometers',
        min: 1,
        max: 100
      },
      {
        key: 'accuracy',
        type: 'string',
        defaultValue: 'medium',
        description: 'Location accuracy',
        options: ['low', 'medium', 'high']
      },
      {
        key: 'showCurrentLocation',
        type: 'boolean',
        defaultValue: true,
        description: 'Show current location button'
      },
      {
        key: 'allowManualEntry',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow manual coordinate entry'
      },
      {
        key: 'coordinateFormat',
        type: 'string',
        defaultValue: 'decimal',
        description: 'Coordinate format',
        options: ['decimal', 'dms', 'both']
      }
    ],
    defaultValue: { latitude: 0, longitude: 0, address: '' },
    required: false,
    useCases: ['Delivery', 'Events', 'Check-ins', 'Location-based services'],
    accessibility: {
      ariaLabel: 'Location selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'country',
    name: 'Country',
    category: 'geographic',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Country selection',
    icon: 'globe',
    htmlType: 'select',
    component: 'CountrySelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Country is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select country...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'defaultCountry',
        type: 'string',
        defaultValue: 'US',
        description: 'Default selected country'
      },
      {
        key: 'showFlags',
        type: 'boolean',
        defaultValue: true,
        description: 'Show country flags'
      },
      {
        key: 'showCodes',
        type: 'boolean',
        defaultValue: false,
        description: 'Show country codes'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      },
      {
        key: 'groupByRegion',
        type: 'boolean',
        defaultValue: false,
        description: 'Group countries by region'
      },
      {
        key: 'allowedCountries',
        type: 'array',
        defaultValue: [],
        description: 'Restrict to specific countries (empty for all)'
      },
      {
        key: 'excludedCountries',
        type: 'array',
        defaultValue: [],
        description: 'Excluded countries'
      },
      {
        key: 'sortBy',
        type: 'string',
        defaultValue: 'name',
        description: 'Sort countries by',
        options: ['name', 'code', 'population', 'region']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Demographics', 'Shipping', 'International forms', 'User registration'],
    accessibility: {
      ariaLabel: 'Country selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'state',
    name: 'State/Province',
    category: 'geographic',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'State/province selection',
    icon: 'map',
    htmlType: 'select',
    component: 'StateSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'State/Province is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select state/province...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'country',
        type: 'string',
        defaultValue: 'US',
        description: 'Country for state/province list',
        options: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN']
      },
      {
        key: 'dependentOnCountry',
        type: 'boolean',
        defaultValue: true,
        description: 'Depend on country field selection'
      },
      {
        key: 'countryFieldId',
        type: 'string',
        defaultValue: '',
        description: 'Country field ID for dependency'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      },
      {
        key: 'showCodes',
        type: 'boolean',
        defaultValue: false,
        description: 'Show state/province codes'
      },
      {
        key: 'groupByRegion',
        type: 'boolean',
        defaultValue: false,
        description: 'Group by regions'
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
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Address forms', 'Demographics', 'Regional surveys', 'Tax forms'],
    accessibility: {
      ariaLabel: 'State/Province selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'city',
    name: 'City',
    category: 'geographic',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'City selection',
    icon: 'city',
    htmlType: 'select',
    component: 'CitySelect',
    validationOptions: [
      {
        type: 'required',
        message: 'City is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select city...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'country',
        type: 'string',
        defaultValue: 'US',
        description: 'Country for city list'
      },
      {
        key: 'state',
        type: 'string',
        defaultValue: '',
        description: 'State/Province for city list'
      },
      {
        key: 'dependentOnState',
        type: 'boolean',
        defaultValue: true,
        description: 'Depend on state field selection'
      },
      {
        key: 'stateFieldId',
        type: 'string',
        defaultValue: '',
        description: 'State field ID for dependency'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      },
      {
        key: 'minPopulation',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum city population',
        min: 0,
        max: 10000000
      },
      {
        key: 'maxResults',
        type: 'number',
        defaultValue: 100,
        description: 'Maximum number of city results',
        min: 10,
        max: 1000
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
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Address forms', 'Location services', 'Demographics', 'Local business'],
    accessibility: {
      ariaLabel: 'City selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'timezone',
    name: 'Timezone',
    category: 'geographic',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Timezone selection',
    icon: 'clock',
    htmlType: 'select',
    component: 'TimezoneSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Timezone is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select timezone...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'defaultTimezone',
        type: 'string',
        defaultValue: 'UTC',
        description: 'Default selected timezone'
      },
      {
        key: 'showUTC',
        type: 'boolean',
        defaultValue: true,
        description: 'Show UTC offset'
      },
      {
        key: 'groupByRegion',
        type: 'boolean',
        defaultValue: true,
        description: 'Group timezones by region'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      },
      {
        key: 'includeDST',
        type: 'boolean',
        defaultValue: true,
        description: 'Include daylight saving time info'
      },
      {
        key: 'autoDetect',
        type: 'boolean',
        defaultValue: true,
        description: 'Auto-detect user timezone'
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: 'long',
        description: 'Timezone display format',
        options: ['short', 'long', 'both']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Scheduling', 'User profiles', 'Event planning', 'Global applications'],
    accessibility: {
      ariaLabel: 'Timezone selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const GEOGRAPHIC_FIELD_CATEGORY: FieldCategory = 'geographic';
