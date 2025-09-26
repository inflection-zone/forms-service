/**
 * Date & Time field definitions
 * Category: Date & Time Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const DATE_TIME_FIELDS: FieldDefinition[] = [
  {
    id: 'date',
    name: 'Date',
    category: 'date-time',
    type: 'date',
    responseType: 'Date',
    description: 'Date picker',
    icon: 'material-symbols:calendar-today',
    htmlType: 'date',
    component: 'DateInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Date is required'
      },
      {
        type: 'date',
        message: 'Please enter a valid date'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select date...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'dateFormat',
        type: 'string',
        defaultValue: 'MM/DD/YYYY',
        description: 'Date format for display',
        options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY', 'DD-MM-YYYY']
      },
      {
        key: 'minDate',
        type: 'string',
        defaultValue: '',
        description: 'Minimum selectable date'
      },
      {
        key: 'maxDate',
        type: 'string',
        defaultValue: '',
        description: 'Maximum selectable date'
      },
      {
        key: 'defaultDate',
        type: 'string',
        defaultValue: '',
        description: 'Default selected date'
      },
      {
        key: 'showToday',
        type: 'boolean',
        defaultValue: true,
        description: 'Show "Today" button'
      },
      {
        key: 'showClear',
        type: 'boolean',
        defaultValue: true,
        description: 'Show clear button'
      },
      {
        key: 'disabledDates',
        type: 'array',
        defaultValue: [],
        description: 'Array of disabled dates'
      },
      {
        key: 'disabledDays',
        type: 'array',
        defaultValue: [],
        description: 'Disabled days of week (0-6)',
        options: [0, 1, 2, 3, 4, 5, 6]
      },
      {
        key: 'locale',
        type: 'string',
        defaultValue: 'en-US',
        description: 'Locale for date formatting',
        options: ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES', 'it-IT', 'ja-JP', 'zh-CN']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Appointments', 'Deadlines', 'Birth dates', 'Event dates'],
    accessibility: {
      ariaLabel: 'Date picker field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'time',
    name: 'Time',
    category: 'date-time',
    type: 'time',
    responseType: 'Time',
    description: 'Time selector',
    icon: 'material-symbols:schedule',
    htmlType: 'time',
    component: 'TimeInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Time is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select time...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: '12',
        description: 'Time format',
        options: ['12', '24']
      },
      {
        key: 'minTime',
        type: 'string',
        defaultValue: '00:00',
        description: 'Minimum selectable time'
      },
      {
        key: 'maxTime',
        type: 'string',
        defaultValue: '23:59',
        description: 'Maximum selectable time'
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 15,
        description: 'Time step in minutes',
        min: 1,
        max: 60
      },
      {
        key: 'showSeconds',
        type: 'boolean',
        defaultValue: false,
        description: 'Show seconds selection'
      },
      {
        key: 'showMeridiem',
        type: 'boolean',
        defaultValue: true,
        description: 'Show AM/PM selector'
      },
      {
        key: 'defaultTime',
        type: 'string',
        defaultValue: '',
        description: 'Default selected time'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Meeting times', 'Schedules', 'Appointment times', 'Business hours'],
    accessibility: {
      ariaLabel: 'Time selector field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'datetime',
    name: 'Date & Time',
    category: 'date-time',
    type: 'datetime-local',
    responseType: 'DateTime',
    description: 'Date and time picker',
    icon: 'material-symbols:event',
    htmlType: 'datetime-local',
    component: 'DateTimeInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Date and time are required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select date and time...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'dateFormat',
        type: 'string',
        defaultValue: 'MM/DD/YYYY',
        description: 'Date format for display',
        options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY', 'DD-MM-YYYY']
      },
      {
        key: 'timeFormat',
        type: 'string',
        defaultValue: '12',
        description: 'Time format',
        options: ['12', '24']
      },
      {
        key: 'minDateTime',
        type: 'string',
        defaultValue: '',
        description: 'Minimum selectable date and time'
      },
      {
        key: 'maxDateTime',
        type: 'string',
        defaultValue: '',
        description: 'Maximum selectable date and time'
      },
      {
        key: 'timezone',
        type: 'string',
        defaultValue: 'local',
        description: 'Timezone handling',
        options: ['local', 'utc', 'specific']
      },
      {
        key: 'timezoneOffset',
        type: 'number',
        defaultValue: 0,
        description: 'Timezone offset in minutes'
      },
      {
        key: 'showTimezone',
        type: 'boolean',
        defaultValue: false,
        description: 'Show timezone selector'
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 15,
        description: 'Time step in minutes',
        min: 1,
        max: 60
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Event scheduling', 'Meeting scheduling', 'Deadlines with time', 'Appointment booking'],
    accessibility: {
      ariaLabel: 'Date and time picker field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'dateRange',
    name: 'Date Range',
    category: 'date-time',
    type: 'daterange',
    responseType: 'Object',
    description: 'Date range selector',
    icon: 'material-symbols:date-range',
    htmlType: 'text',
    component: 'DateRangeInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Date range is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select date range...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'dateFormat',
        type: 'string',
        defaultValue: 'MM/DD/YYYY',
        description: 'Date format for display',
        options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY', 'DD-MM-YYYY']
      },
      {
        key: 'separator',
        type: 'string',
        defaultValue: ' - ',
        description: 'Separator between start and end dates'
      },
      {
        key: 'minDate',
        type: 'string',
        defaultValue: '',
        description: 'Minimum selectable date'
      },
      {
        key: 'maxDate',
        type: 'string',
        defaultValue: '',
        description: 'Maximum selectable date'
      },
      {
        key: 'minRange',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum range in days',
        min: 1,
        max: 365
      },
      {
        key: 'maxRange',
        type: 'number',
        defaultValue: 365,
        description: 'Maximum range in days',
        min: 1,
        max: 3650
      },
      {
        key: 'showDuration',
        type: 'boolean',
        defaultValue: true,
        description: 'Show duration calculation'
      },
      {
        key: 'presets',
        type: 'array',
        defaultValue: [
          { label: 'Last 7 days', value: 7 },
          { label: 'Last 30 days', value: 30 },
          { label: 'Last 90 days', value: 90 }
        ],
        description: 'Preset date ranges'
      }
    ],
    defaultValue: { start: '', end: '' },
    required: false,
    useCases: ['Booking periods', 'Project timelines', 'Report periods', 'Vacation requests'],
    accessibility: {
      ariaLabel: 'Date range selector field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'timeRange',
    name: 'Time Range',
    category: 'date-time',
    type: 'timerange',
    responseType: 'Object',
    description: 'Time range selector',
    icon: 'material-symbols:schedule',
    htmlType: 'text',
    component: 'TimeRangeInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Time range is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select time range...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: '12',
        description: 'Time format',
        options: ['12', '24']
      },
      {
        key: 'separator',
        type: 'string',
        defaultValue: ' - ',
        description: 'Separator between start and end times'
      },
      {
        key: 'minTime',
        type: 'string',
        defaultValue: '00:00',
        description: 'Minimum selectable time'
      },
      {
        key: 'maxTime',
        type: 'string',
        defaultValue: '23:59',
        description: 'Maximum selectable time'
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 15,
        description: 'Time step in minutes',
        min: 1,
        max: 60
      },
      {
        key: 'showDuration',
        type: 'boolean',
        defaultValue: true,
        description: 'Show duration calculation'
      },
      {
        key: 'allowOvernight',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow overnight time ranges'
      },
      {
        key: 'presets',
        type: 'array',
        defaultValue: [
          { label: 'Morning (9AM-12PM)', value: { start: '09:00', end: '12:00' } },
          { label: 'Afternoon (1PM-5PM)', value: { start: '13:00', end: '17:00' } },
          { label: 'Evening (6PM-9PM)', value: { start: '18:00', end: '21:00' } }
        ],
        description: 'Preset time ranges'
      }
    ],
    defaultValue: { start: '', end: '' },
    required: false,
    useCases: ['Work hours', 'Availability windows', 'Business hours', 'Shift schedules'],
    accessibility: {
      ariaLabel: 'Time range selector field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'recurring',
    name: 'Recurring',
    category: 'date-time',
    type: 'recurring',
    responseType: 'Object',
    description: 'Recurring date pattern',
    icon: 'material-symbols:repeat',
    htmlType: 'text',
    component: 'RecurringInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Recurring pattern is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select recurring pattern...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'frequency',
        type: 'string',
        defaultValue: 'weekly',
        description: 'Recurring frequency',
        options: ['daily', 'weekly', 'monthly', 'yearly', 'custom']
      },
      {
        key: 'interval',
        type: 'number',
        defaultValue: 1,
        description: 'Interval between occurrences',
        min: 1,
        max: 365
      },
      {
        key: 'daysOfWeek',
        type: 'array',
        defaultValue: [],
        description: 'Days of week for weekly recurrence',
        options: [0, 1, 2, 3, 4, 5, 6]
      },
      {
        key: 'dayOfMonth',
        type: 'number',
        defaultValue: 1,
        description: 'Day of month for monthly recurrence',
        min: 1,
        max: 31
      },
      {
        key: 'endCondition',
        type: 'string',
        defaultValue: 'never',
        description: 'When to stop recurring',
        options: ['never', 'after', 'on']
      },
      {
        key: 'endAfter',
        type: 'number',
        defaultValue: 10,
        description: 'Number of occurrences',
        min: 1,
        max: 1000
      },
      {
        key: 'endDate',
        type: 'string',
        defaultValue: '',
        description: 'End date for recurring pattern'
      },
      {
        key: 'startDate',
        type: 'string',
        defaultValue: '',
        description: 'Start date for recurring pattern'
      }
    ],
    defaultValue: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [],
      endCondition: 'never'
    },
    required: false,
    useCases: ['Recurring events', 'Subscription billing', 'Regular meetings', 'Maintenance schedules'],
    accessibility: {
      ariaLabel: 'Recurring pattern selector field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'birthday',
    name: 'Birthday',
    category: 'date-time',
    type: 'date',
    responseType: 'Date',
    description: 'Birth date with age calculation',
    icon: 'material-symbols:cake',
    htmlType: 'date',
    component: 'BirthdayInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Birth date is required'
      },
      {
        type: 'date',
        message: 'Please enter a valid birth date'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select your birth date...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'dateFormat',
        type: 'string',
        defaultValue: 'MM/DD/YYYY',
        description: 'Date format for display',
        options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY', 'DD-MM-YYYY']
      },
      {
        key: 'minAge',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum age allowed',
        min: 0,
        max: 150
      },
      {
        key: 'maxAge',
        type: 'number',
        defaultValue: 150,
        description: 'Maximum age allowed',
        min: 0,
        max: 150
      },
      {
        key: 'showAge',
        type: 'boolean',
        defaultValue: true,
        description: 'Show calculated age'
      },
      {
        key: 'ageFormat',
        type: 'string',
        defaultValue: 'years',
        description: 'Age display format',
        options: ['years', 'years-months', 'years-months-days']
      },
      {
        key: 'minDate',
        type: 'string',
        defaultValue: '',
        description: 'Minimum selectable date (calculated from maxAge)'
      },
      {
        key: 'maxDate',
        type: 'string',
        defaultValue: '',
        description: 'Maximum selectable date (calculated from minAge)'
      },
      {
        key: 'showZodiac',
        type: 'boolean',
        defaultValue: false,
        description: 'Show zodiac sign'
      },
      {
        key: 'showSeason',
        type: 'boolean',
        defaultValue: false,
        description: 'Show season of birth'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Registration forms', 'Demographics', 'Age verification', 'Birthday reminders'],
    accessibility: {
      ariaLabel: 'Birth date input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const DATE_TIME_FIELD_CATEGORY: FieldCategory = 'date-time';
