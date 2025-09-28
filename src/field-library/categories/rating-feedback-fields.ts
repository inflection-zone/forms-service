/**
 * Rating & Feedback field definitions
 * Category: Rating & Feedback Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const RATING_FEEDBACK_FIELDS: FieldDefinition[] = [
  {
    id: 'starRating',
    name: 'Star Rating',
    category: 'rating-feedback',
    type: 'rating',
    responseType: 'Integer',
    description: 'Star-based rating',
    icon: 'material-symbols:star',
    htmlType: 'range',
    component: 'StarRating',
    validationOptions: [
      {
        type: 'required',
        message: 'Rating is required'
      },
      {
        type: 'min',
        value: 1,
        message: 'Please select at least 1 star'
      },
      {
        type: 'max',
        value: 5,
        message: 'Maximum rating is 5 stars'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Rate this item...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'maxStars',
        type: 'number',
        defaultValue: 5,
        description: 'Maximum number of stars',
        min: 1,
        max: 10
      },
      {
        key: 'minStars',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum number of stars',
        min: 1,
        max: 10
      },
      {
        key: 'allowHalfStars',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow half-star ratings'
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show star count labels'
      },
      {
        key: 'labels',
        type: 'array',
        defaultValue: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
        description: 'Custom labels for each star'
      },
      {
        key: 'color',
        type: 'string',
        defaultValue: '#ffc107',
        description: 'Star color',
        options: ['#ffc107', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Star size',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'readonly',
        type: 'boolean',
        defaultValue: false,
        description: 'Make rating read-only'
      },
      {
        key: 'showAverage',
        type: 'boolean',
        defaultValue: false,
        description: 'Show average rating'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Product reviews', 'Satisfaction surveys', 'Quality ratings', 'Service feedback'],
    accessibility: {
      ariaLabel: 'Star rating field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'thumbsRating',
    name: 'Thumbs Rating',
    category: 'rating-feedback',
    type: 'rating',
    responseType: 'Boolean',
    description: 'Thumbs up/down rating',
    icon: 'material-symbols:thumb-up',
    htmlType: 'radio',
    component: 'ThumbsRating',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select thumbs up or down'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Rate this item...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show thumbs up/down labels'
      },
      {
        key: 'upLabel',
        type: 'string',
        defaultValue: 'Thumbs Up',
        description: 'Label for thumbs up'
      },
      {
        key: 'downLabel',
        type: 'string',
        defaultValue: 'Thumbs Down',
        description: 'Label for thumbs down'
      },
      {
        key: 'upIcon',
        type: 'string',
        defaultValue: 'thumbs-up',
        description: 'Icon for thumbs up'
      },
      {
        key: 'downIcon',
        type: 'string',
        defaultValue: 'thumbs-down',
        description: 'Icon for thumbs down'
      },
      {
        key: 'upColor',
        type: 'string',
        defaultValue: '#28a745',
        description: 'Color for thumbs up'
      },
      {
        key: 'downColor',
        type: 'string',
        defaultValue: '#dc3545',
        description: 'Color for thumbs down'
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Button size',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'allowNeutral',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow neutral/no opinion option'
      },
      {
        key: 'neutralLabel',
        type: 'string',
        defaultValue: 'Neutral',
        description: 'Label for neutral option'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Quick feedback', 'Like/dislike', 'Approval ratings', 'Simple polls'],
    accessibility: {
      ariaLabel: 'Thumbs rating field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'emojiRating',
    name: 'Emoji Rating',
    category: 'rating-feedback',
    type: 'rating',
    responseType: 'Integer',
    description: 'Emoji-based rating',
    icon: 'material-symbols:sentiment-satisfied',
    htmlType: 'radio',
    component: 'EmojiRating',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select an emoji rating'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'How do you feel about this?',
        description: 'Placeholder text for the field'
      },
      {
        key: 'emojis',
        type: 'array',
        defaultValue: ['😞', '😐', '🙂', '😊', '😍'],
        description: 'Array of emojis to use'
      },
      {
        key: 'labels',
        type: 'array',
        defaultValue: ['Very Bad', 'Bad', 'Neutral', 'Good', 'Excellent'],
        description: 'Labels for each emoji'
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show labels below emojis'
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'large',
        description: 'Emoji size',
        options: ['small', 'medium', 'large', 'xlarge']
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'horizontal',
        description: 'Layout orientation',
        options: ['horizontal', 'vertical']
      },
      {
        key: 'allowMultiple',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow multiple emoji selection'
      },
      {
        key: 'maxSelections',
        type: 'number',
        defaultValue: 1,
        description: 'Maximum emoji selections allowed',
        min: 1,
        max: 10
      },
      {
        key: 'customEmojis',
        type: 'array',
        defaultValue: [],
        description: 'Custom emoji set'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['User experience', 'Mood tracking', 'Emotional feedback', 'Satisfaction surveys'],
    accessibility: {
      ariaLabel: 'Emoji rating field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'sliderRating',
    name: 'Slider Rating',
    category: 'rating-feedback',
    type: 'range',
    responseType: 'Integer',
    description: 'Slider-based rating',
    icon: 'material-symbols:tune',
    htmlType: 'range',
    component: 'SliderRating',
    validationOptions: [
      {
        type: 'required',
        message: 'Please provide a rating'
      },
      {
        type: 'min',
        value: 0,
        message: 'Rating must be at least 0'
      },
      {
        type: 'max',
        value: 10,
        message: 'Rating must be no more than 10'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Rate from 0 to 10...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum rating value',
        min: 0,
        max: 100
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum rating value',
        min: 1,
        max: 100
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 1,
        description: 'Step increment',
        min: 0.1,
        max: 10
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show min/max labels'
      },
      {
        key: 'minLabel',
        type: 'string',
        defaultValue: '0',
        description: 'Label for minimum value'
      },
      {
        key: 'maxLabel',
        type: 'string',
        defaultValue: '10',
        description: 'Label for maximum value'
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
    defaultValue: 5,
    required: false,
    useCases: ['Satisfaction scales', 'Intensity ratings', 'Preference levels', 'Performance ratings'],
    accessibility: {
      ariaLabel: 'Slider rating field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'npsScore',
    name: 'NPS Score',
    category: 'rating-feedback',
    type: 'rating',
    responseType: 'Integer',
    description: 'Net Promoter Score (0-10)',
    icon: 'material-symbols:trending-up',
    htmlType: 'radio',
    component: 'NPSScore',
    validationOptions: [
      {
        type: 'required',
        message: 'NPS score is required'
      },
      {
        type: 'min',
        value: 0,
        message: 'Score must be at least 0'
      },
      {
        type: 'max',
        value: 10,
        message: 'Score must be no more than 10'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'How likely are you to recommend us?',
        description: 'Placeholder text for the field'
      },
      {
        key: 'question',
        type: 'string',
        defaultValue: 'How likely are you to recommend us to a friend or colleague?',
        description: 'NPS question text'
      },
      {
        key: 'minLabel',
        type: 'string',
        defaultValue: 'Not at all likely',
        description: 'Label for score 0'
      },
      {
        key: 'maxLabel',
        type: 'string',
        defaultValue: 'Extremely likely',
        description: 'Label for score 10'
      },
      {
        key: 'showLabels',
        type: 'boolean',
        defaultValue: true,
        description: 'Show min/max labels'
      },
      {
        key: 'showNumbers',
        type: 'boolean',
        defaultValue: true,
        description: 'Show number labels'
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'horizontal',
        description: 'Layout orientation',
        options: ['horizontal', 'vertical']
      },
      {
        key: 'color',
        type: 'string',
        defaultValue: '#007bff',
        description: 'Button color'
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Button size',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'showCategories',
        type: 'boolean',
        defaultValue: true,
        description: 'Show Detractors/Passives/Promoters categories'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Customer satisfaction', 'Net Promoter Score surveys', 'Loyalty measurement', 'Service quality'],
    accessibility: {
      ariaLabel: 'Net Promoter Score field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'likertScale',
    name: 'Likert Scale',
    category: 'rating-feedback',
    type: 'radio',
    responseType: 'SingleChoiceSelection',
    description: 'Agreement scale',
    icon: 'material-symbols:balance',
    htmlType: 'radio',
    component: 'LikertScale',
    validationOptions: [
      {
        type: 'required',
        message: 'Please select your level of agreement'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Please indicate your level of agreement...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'question',
        type: 'string',
        defaultValue: 'Please rate your agreement with the following statement:',
        description: 'Question or statement text'
      },
      {
        key: 'scale',
        type: 'string',
        defaultValue: '5-point',
        description: 'Scale type',
        options: ['3-point', '4-point', '5-point', '6-point', '7-point', 'custom']
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' }
        ],
        description: 'Scale options'
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'horizontal',
        description: 'Layout orientation',
        options: ['horizontal', 'vertical']
      },
      {
        key: 'showNumbers',
        type: 'boolean',
        defaultValue: true,
        description: 'Show option numbers'
      },
      {
        key: 'color',
        type: 'string',
        defaultValue: '#007bff',
        description: 'Button color'
      },
      {
        key: 'size',
        type: 'string',
        defaultValue: 'medium',
        description: 'Button size',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'allowNeutral',
        type: 'boolean',
        defaultValue: true,
        description: 'Include neutral option'
      },
      {
        key: 'reverseScale',
        type: 'boolean',
        defaultValue: false,
        description: 'Reverse the scale order'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Surveys', 'Assessments', 'Opinion polls', 'Research studies'],
    accessibility: {
      ariaLabel: 'Likert scale field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const RATING_FEEDBACK_FIELD_CATEGORY: FieldCategory = 'rating-feedback';
