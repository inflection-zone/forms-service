/**
 * Survey & Research field definitions
 * Category: Survey & Research Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const SURVEY_FIELDS: FieldDefinition[] = [
  {
    id: 'matrixRating',
    name: 'Matrix Rating',
    category: 'survey-research',
    type: 'matrix',
    responseType: 'Object',
    description: 'Grid of ratings',
    icon: 'grid',
    htmlType: 'text',
    component: 'MatrixRating',
    validationOptions: [
      {
        type: 'required',
        message: 'Please complete all ratings'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Please rate each item...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'rows',
        type: 'array',
        defaultValue: [
          'Quality',
          'Price',
          'Service',
          'Delivery',
          'Overall Experience'
        ],
        description: 'Row labels for rating items'
      },
      {
        key: 'columns',
        type: 'array',
        defaultValue: [
          { value: 1, label: 'Poor' },
          { value: 2, label: 'Fair' },
          { value: 3, label: 'Good' },
          { value: 4, label: 'Very Good' },
          { value: 5, label: 'Excellent' }
        ],
        description: 'Column labels for rating scale'
      },
      {
        key: 'scaleType',
        type: 'string',
        defaultValue: 'numeric',
        description: 'Type of rating scale',
        options: ['numeric', 'likert', 'frequency', 'agreement', 'satisfaction']
      },
      {
        key: 'requiredRows',
        type: 'array',
        defaultValue: [],
        description: 'Required row indices (0-based)'
      },
      {
        key: 'allowNeutral',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow neutral/center option'
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show row and column labels'
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'table',
        description: 'Matrix layout',
        options: ['table', 'cards', 'list']
      }
    ],
    defaultValue: {},
    required: false,
    useCases: ['Complex surveys', 'Product evaluation', 'Service assessment', 'Research studies'],
    accessibility: {
      ariaLabel: 'Matrix rating field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'rankOrder',
    name: 'Rank Order',
    category: 'survey-research',
    type: 'ranking',
    responseType: 'Object',
    description: 'Drag-drop ranking',
    icon: 'sort',
    htmlType: 'text',
    component: 'RankOrder',
    validationOptions: [
      {
        type: 'required',
        message: 'Please rank all items'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Rank the items in order of preference...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'items',
        type: 'array',
        defaultValue: [
          'Option A',
          'Option B',
          'Option C',
          'Option D',
          'Option E'
        ],
        description: 'Items to be ranked'
      },
      {
        key: 'minItems',
        type: 'number',
        defaultValue: 2,
        description: 'Minimum number of items to rank',
        min: 2,
        max: 20
      },
      {
        key: 'maxItems',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of items to rank',
        min: 2,
        max: 50
      },
      {
        key: 'allowTies',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow tied rankings'
      },
      {
        key: 'showNumbers',
        type: 'boolean',
        defaultValue: true,
        description: 'Show ranking numbers'
      },
      {
        key: 'dragDrop',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable drag and drop'
      },
      {
        key: 'direction',
        type: 'string',
        defaultValue: 'vertical',
        description: 'Ranking direction',
        options: ['vertical', 'horizontal']
      }
    ],
    defaultValue: {},
    required: false,
    useCases: ['Priority surveys', 'Preference studies', 'Product ranking', 'Feature prioritization'],
    accessibility: {
      ariaLabel: 'Rank order field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'imageAnnotation',
    name: 'Image Annotation',
    category: 'survey-research',
    type: 'annotation',
    responseType: 'Object',
    description: 'Image markup',
    icon: 'image',
    htmlType: 'text',
    component: 'ImageAnnotation',
    validationOptions: [
      {
        type: 'required',
        message: 'Please annotate the image'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Annotate the image...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'imageUrl',
        type: 'string',
        defaultValue: '',
        description: 'URL of the image to annotate'
      },
      {
        key: 'tools',
        type: 'array',
        defaultValue: ['point', 'rectangle', 'circle', 'arrow', 'text'],
        description: 'Available annotation tools',
        options: ['point', 'rectangle', 'circle', 'arrow', 'line', 'text', 'freehand']
      },
      {
        key: 'colors',
        type: 'array',
        defaultValue: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
        description: 'Available annotation colors'
      },
      {
        key: 'maxAnnotations',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of annotations',
        min: 1,
        max: 100
      },
      {
        key: 'allowText',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow text annotations'
      },
      {
        key: 'showCoordinates',
        type: 'boolean',
        defaultValue: false,
        description: 'Show coordinate information'
      },
      {
        key: 'exportFormat',
        type: 'string',
        defaultValue: 'json',
        description: 'Export format for annotations',
        options: ['json', 'xml', 'csv']
      }
    ],
    defaultValue: { annotations: [] },
    required: false,
    useCases: ['Research studies', 'Image analysis', 'User testing', 'Design feedback'],
    accessibility: {
      ariaLabel: 'Image annotation field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'videoResponse',
    name: 'Video Response',
    category: 'survey-research',
    type: 'video',
    responseType: 'File',
    description: 'Video response recording',
    icon: 'video',
    htmlType: 'file',
    component: 'VideoResponse',
    validationOptions: [
      {
        type: 'required',
        message: 'Video response is required'
      },
      {
        type: 'fileType',
        value: ['mp4', 'webm', 'mov'],
        message: 'Please upload a valid video file'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Record your video response...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'maxDuration',
        type: 'number',
        defaultValue: 300,
        description: 'Maximum recording duration in seconds',
        min: 10,
        max: 1800
      },
      {
        key: 'minDuration',
        type: 'number',
        defaultValue: 10,
        description: 'Minimum recording duration in seconds',
        min: 1,
        max: 300
      },
      {
        key: 'maxSize',
        type: 'number',
        defaultValue: 104857600,
        description: 'Maximum file size in bytes',
        min: 1048576,
        max: 1073741824
      },
      {
        key: 'quality',
        type: 'string',
        defaultValue: 'medium',
        description: 'Video quality',
        options: ['low', 'medium', 'high']
      },
      {
        key: 'showTimer',
        type: 'boolean',
        defaultValue: true,
        description: 'Show recording timer'
      },
      {
        key: 'allowRetake',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow retaking the video'
      },
      {
        key: 'showPreview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show video preview before submission'
      },
      {
        key: 'transcription',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable automatic transcription'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Interviews', 'User feedback', 'Testimonials', 'Research responses'],
    accessibility: {
      ariaLabel: 'Video response field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'audioResponse',
    name: 'Audio Response',
    category: 'survey-research',
    type: 'audio',
    responseType: 'File',
    description: 'Voice response',
    icon: 'microphone',
    htmlType: 'file',
    component: 'AudioResponse',
    validationOptions: [
      {
        type: 'required',
        message: 'Audio response is required'
      },
      {
        type: 'fileType',
        value: ['mp3', 'wav', 'ogg', 'm4a'],
        message: 'Please upload a valid audio file'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Record your audio response...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'maxDuration',
        type: 'number',
        defaultValue: 300,
        description: 'Maximum recording duration in seconds',
        min: 10,
        max: 1800
      },
      {
        key: 'minDuration',
        type: 'number',
        defaultValue: 10,
        description: 'Minimum recording duration in seconds',
        min: 1,
        max: 300
      },
      {
        key: 'maxSize',
        type: 'number',
        defaultValue: 52428800,
        description: 'Maximum file size in bytes',
        min: 1048576,
        max: 104857600
      },
      {
        key: 'quality',
        type: 'string',
        defaultValue: 'medium',
        description: 'Audio quality',
        options: ['low', 'medium', 'high']
      },
      {
        key: 'showTimer',
        type: 'boolean',
        defaultValue: true,
        description: 'Show recording timer'
      },
      {
        key: 'allowRetake',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow retaking the audio'
      },
      {
        key: 'showWaveform',
        type: 'boolean',
        defaultValue: true,
        description: 'Show audio waveform'
      },
      {
        key: 'transcription',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable automatic transcription'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Voice surveys', 'Interviews', 'Feedback collection', 'Research responses'],
    accessibility: {
      ariaLabel: 'Audio response field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'heatmap',
    name: 'Heatmap',
    category: 'survey-research',
    type: 'heatmap',
    responseType: 'Object',
    description: 'Click/hover tracking',
    icon: 'map',
    htmlType: 'text',
    component: 'Heatmap',
    validationOptions: [
      {
        type: 'required',
        message: 'Please interact with the image'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Click on areas of interest...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'imageUrl',
        type: 'string',
        defaultValue: '',
        description: 'URL of the image for heatmap'
      },
      {
        key: 'trackClicks',
        type: 'boolean',
        defaultValue: true,
        description: 'Track click events'
      },
      {
        key: 'trackHovers',
        type: 'boolean',
        defaultValue: true,
        description: 'Track hover events'
      },
      {
        key: 'trackTime',
        type: 'boolean',
        defaultValue: true,
        description: 'Track time spent on each area'
      },
      {
        key: 'minInteractions',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum number of interactions required',
        min: 1,
        max: 100
      },
      {
        key: 'maxInteractions',
        type: 'number',
        defaultValue: 50,
        description: 'Maximum number of interactions allowed',
        min: 10,
        max: 1000
      },
      {
        key: 'showHeatmap',
        type: 'boolean',
        defaultValue: true,
        description: 'Show heatmap visualization'
      },
      {
        key: 'exportData',
        type: 'boolean',
        defaultValue: true,
        description: 'Export interaction data'
      }
    ],
    defaultValue: { interactions: [] },
    required: false,
    useCases: ['UX research', 'User testing', 'Website analysis', 'Design feedback'],
    accessibility: {
      ariaLabel: 'Heatmap interaction field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'survey-research',
    type: 'range',
    responseType: 'Integer',
    description: 'Value slider',
    icon: 'slider',
    htmlType: 'range',
    component: 'Slider',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select a value'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select a value...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum slider value',
        min: 0,
        max: 100
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 100,
        description: 'Maximum slider value',
        min: 10,
        max: 1000
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 1,
        description: 'Slider step increment',
        min: 0.1,
        max: 10
      },
      {
        key: 'labels',
        type: 'array',
        defaultValue: ['Very Low', 'Low', 'Medium', 'High', 'Very High'],
        description: 'Slider labels'
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show slider labels'
      },
      {
        key: 'showValue',
        type: 'boolean',
        defaultValue: true,
        description: 'Show current value'
      },
      {
        key: 'color',
        type: 'string',
        defaultValue: '#007bff',
        description: 'Slider color'
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Slider size',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'marks',
        type: 'array',
        defaultValue: [],
        description: 'Custom marks on the slider'
      }
    ],
    defaultValue: 50,
    required: false,
    useCases: ['Preference scales', 'Satisfaction surveys', 'Intensity ratings', 'Research studies'],
    accessibility: {
      ariaLabel: 'Slider field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const SURVEY_FIELD_CATEGORY: FieldCategory = 'survey-research';
