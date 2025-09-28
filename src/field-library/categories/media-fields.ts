/**
 * Media & File field definitions
 * Category: Media & File Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const MEDIA_FIELDS: FieldDefinition[] = [
  {
    id: 'fileUpload',
    name: 'File Upload',
    category: 'media-file',
    type: 'file',
    responseType: 'File',
    description: 'Single file upload',
    icon: 'material-symbols:upload',
    htmlType: 'file',
    component: 'FileUpload',
    validationOptions: [
      {
        type: 'required',
        message: 'File is required'
      },
      {
        type: 'fileSize',
        value: 10485760,
        message: 'File size must be less than 10MB'
      },
      {
        type: 'fileType',
        value: ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'gif'],
        message: 'Invalid file type'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Choose file...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'accept',
        type: 'string',
        defaultValue: '*/*',
        description: 'Accepted file types',
        options: ['*/*', 'image/*', 'video/*', 'audio/*', 'application/pdf', 'text/*', 'application/msword']
      },
      {
        key: 'maxSize',
        type: 'number',
        defaultValue: 10485760,
        description: 'Maximum file size in bytes',
        min: 1024,
        max: 104857600
      },
      {
        key: 'minSize',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum file size in bytes',
        min: 0,
        max: 10485760
      },
      {
        key: 'multiple',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow multiple file selection'
      },
      {
        key: 'maxFiles',
        type: 'number',
        defaultValue: 1,
        description: 'Maximum number of files',
        min: 1,
        max: 100
      },
      {
        key: 'preview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show file preview'
      },
      {
        key: 'dragDrop',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable drag and drop'
      },
      {
        key: 'progress',
        type: 'boolean',
        defaultValue: true,
        description: 'Show upload progress'
      },
      {
        key: 'allowedTypes',
        type: 'array',
        defaultValue: ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'gif'],
        description: 'Allowed file extensions'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Documents', 'Resumes', 'Contracts', 'Reports'],
    accessibility: {
      ariaLabel: 'File upload field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'multiFileUpload',
    name: 'Multi File Upload',
    category: 'media-file',
    type: 'file',
    responseType: 'File',
    description: 'Multiple file upload',
    icon: 'material-symbols:upload-file',
    htmlType: 'file',
    component: 'MultiFileUpload',
    validationOptions: [
      {
        type: 'required',
        message: 'At least one file is required'
      },
      {
        type: 'fileSize',
        value: 52428800,
        message: 'Total file size must be less than 50MB'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Choose files...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'accept',
        type: 'string',
        defaultValue: '*/*',
        description: 'Accepted file types'
      },
      {
        key: 'maxSize',
        type: 'number',
        defaultValue: 10485760,
        description: 'Maximum file size in bytes',
        min: 1024,
        max: 104857600
      },
      {
        key: 'maxFiles',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of files',
        min: 1,
        max: 100
      },
      {
        key: 'minFiles',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum number of files',
        min: 1,
        max: 50
      },
      {
        key: 'totalMaxSize',
        type: 'number',
        defaultValue: 52428800,
        description: 'Maximum total size in bytes',
        min: 1048576,
        max: 1048576000
      },
      {
        key: 'preview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show file previews'
      },
      {
        key: 'dragDrop',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable drag and drop'
      },
      {
        key: 'batchUpload',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable batch upload'
      },
      {
        key: 'showProgress',
        type: 'boolean',
        defaultValue: true,
        description: 'Show upload progress'
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Galleries', 'Portfolios', 'Document collections', 'Asset libraries'],
    accessibility: {
      ariaLabel: 'Multiple file upload field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'imageUpload',
    name: 'Image Upload',
    category: 'media-file',
    type: 'file',
    responseType: 'File',
    description: 'Image-specific upload',
    icon: 'material-symbols:image',
    htmlType: 'file',
    component: 'ImageUpload',
    validationOptions: [
      {
        type: 'required',
        message: 'Image is required'
      },
      {
        type: 'fileType',
        value: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
        message: 'Please upload a valid image file'
      },
      {
        type: 'fileSize',
        value: 5242880,
        message: 'Image size must be less than 5MB'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Choose image...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'accept',
        type: 'string',
        defaultValue: 'image/*',
        description: 'Accepted image types'
      },
      {
        key: 'maxSize',
        type: 'number',
        defaultValue: 5242880,
        description: 'Maximum file size in bytes',
        min: 1024,
        max: 52428800
      },
      {
        key: 'maxWidth',
        type: 'number',
        defaultValue: 4000,
        description: 'Maximum image width in pixels',
        min: 100,
        max: 10000
      },
      {
        key: 'maxHeight',
        type: 'number',
        defaultValue: 4000,
        description: 'Maximum image height in pixels',
        min: 100,
        max: 10000
      },
      {
        key: 'minWidth',
        type: 'number',
        defaultValue: 100,
        description: 'Minimum image width in pixels',
        min: 10,
        max: 1000
      },
      {
        key: 'minHeight',
        type: 'number',
        defaultValue: 100,
        description: 'Minimum image height in pixels',
        min: 10,
        max: 1000
      },
      {
        key: 'aspectRatio',
        type: 'string',
        defaultValue: 'free',
        description: 'Required aspect ratio',
        options: ['free', '1:1', '4:3', '16:9', '3:2', 'custom']
      },
      {
        key: 'customAspectRatio',
        type: 'string',
        defaultValue: '',
        description: 'Custom aspect ratio (e.g., 2:1)'
      },
      {
        key: 'compression',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable image compression'
      },
      {
        key: 'quality',
        type: 'number',
        defaultValue: 0.8,
        description: 'Image compression quality',
        min: 0.1,
        max: 1
      },
      {
        key: 'crop',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable image cropping'
      },
      {
        key: 'preview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show image preview'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Profile pictures', 'Galleries', 'Product images', 'Avatars'],
    accessibility: {
      ariaLabel: 'Image upload field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'videoUpload',
    name: 'Video Upload',
    category: 'media-file',
    type: 'file',
    responseType: 'File',
    description: 'Video file upload',
    icon: 'material-symbols:play-circle',
    htmlType: 'file',
    component: 'VideoUpload',
    validationOptions: [
      {
        type: 'required',
        message: 'Video is required'
      },
      {
        type: 'fileType',
        value: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
        message: 'Please upload a valid video file'
      },
      {
        type: 'fileSize',
        value: 104857600,
        message: 'Video size must be less than 100MB'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Choose video...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'accept',
        type: 'string',
        defaultValue: 'video/*',
        description: 'Accepted video types'
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
        key: 'maxDuration',
        type: 'number',
        defaultValue: 300,
        description: 'Maximum duration in seconds',
        min: 1,
        max: 3600
      },
      {
        key: 'minDuration',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum duration in seconds',
        min: 1,
        max: 300
      },
      {
        key: 'maxResolution',
        type: 'string',
        defaultValue: '1920x1080',
        description: 'Maximum video resolution',
        options: ['720x480', '1280x720', '1920x1080', '2560x1440', '3840x2160']
      },
      {
        key: 'minResolution',
        type: 'string',
        defaultValue: '480x360',
        description: 'Minimum video resolution',
        options: ['320x240', '480x360', '640x480', '720x480', '1280x720']
      },
      {
        key: 'allowedFormats',
        type: 'array',
        defaultValue: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
        description: 'Allowed video formats'
      },
      {
        key: 'preview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show video preview'
      },
      {
        key: 'thumbnail',
        type: 'boolean',
        defaultValue: true,
        description: 'Generate thumbnail'
      },
      {
        key: 'transcoding',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable video transcoding'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Content creation', 'Tutorials', 'Presentations', 'Marketing videos'],
    accessibility: {
      ariaLabel: 'Video upload field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'audioUpload',
    name: 'Audio Upload',
    category: 'media-file',
    type: 'file',
    responseType: 'File',
    description: 'Audio file upload',
    icon: 'material-symbols:audiotrack',
    htmlType: 'file',
    component: 'AudioUpload',
    validationOptions: [
      {
        type: 'required',
        message: 'Audio file is required'
      },
      {
        type: 'fileType',
        value: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'],
        message: 'Please upload a valid audio file'
      },
      {
        type: 'fileSize',
        value: 52428800,
        message: 'Audio size must be less than 50MB'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Choose audio file...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'accept',
        type: 'string',
        defaultValue: 'audio/*',
        description: 'Accepted audio types'
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
        key: 'maxDuration',
        type: 'number',
        defaultValue: 600,
        description: 'Maximum duration in seconds',
        min: 1,
        max: 3600
      },
      {
        key: 'minDuration',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum duration in seconds',
        min: 1,
        max: 300
      },
      {
        key: 'allowedFormats',
        type: 'array',
        defaultValue: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'],
        description: 'Allowed audio formats'
      },
      {
        key: 'preview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show audio preview'
      },
      {
        key: 'waveform',
        type: 'boolean',
        defaultValue: false,
        description: 'Show waveform visualization'
      },
      {
        key: 'transcription',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable audio transcription'
      },
      {
        key: 'quality',
        type: 'string',
        defaultValue: 'medium',
        description: 'Audio quality',
        options: ['low', 'medium', 'high', 'lossless']
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Podcasts', 'Recordings', 'Voice messages', 'Music uploads'],
    accessibility: {
      ariaLabel: 'Audio upload field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'documentUpload',
    name: 'Document Upload',
    category: 'media-file',
    type: 'file',
    responseType: 'File',
    description: 'Document upload',
    icon: 'material-symbols:description',
    htmlType: 'file',
    component: 'DocumentUpload',
    validationOptions: [
      {
        type: 'required',
        message: 'Document is required'
      },
      {
        type: 'fileType',
        value: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
        message: 'Please upload a valid document file'
      },
      {
        type: 'fileSize',
        value: 10485760,
        message: 'Document size must be less than 10MB'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Choose document...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'accept',
        type: 'string',
        defaultValue: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain',
        description: 'Accepted document types'
      },
      {
        key: 'maxSize',
        type: 'number',
        defaultValue: 10485760,
        description: 'Maximum file size in bytes',
        min: 1024,
        max: 52428800
      },
      {
        key: 'allowedFormats',
        type: 'array',
        defaultValue: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
        description: 'Allowed document formats'
      },
      {
        key: 'preview',
        type: 'boolean',
        defaultValue: true,
        description: 'Show document preview'
      },
      {
        key: 'ocr',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable OCR text extraction'
      },
      {
        key: 'passwordProtected',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow password-protected documents'
      },
      {
        key: 'metadata',
        type: 'boolean',
        defaultValue: true,
        description: 'Extract document metadata'
      },
      {
        key: 'versionControl',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable version control'
      }
    ],
    defaultValue: null,
    required: false,
    useCases: ['Legal forms', 'Applications', 'Contracts', 'Reports'],
    accessibility: {
      ariaLabel: 'Document upload field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'signature',
    name: 'Signature',
    category: 'media-file',
    type: 'signature',
    responseType: 'Text',
    description: 'Digital signature capture',
    icon: 'material-symbols:edit',
    htmlType: 'text',
    component: 'SignaturePad',
    validationOptions: [
      {
        type: 'required',
        message: 'Signature is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Sign here...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'width',
        type: 'number',
        defaultValue: 400,
        description: 'Signature pad width in pixels',
        min: 200,
        max: 800
      },
      {
        key: 'height',
        type: 'number',
        defaultValue: 200,
        description: 'Signature pad height in pixels',
        min: 100,
        max: 400
      },
      {
        key: 'penColor',
        type: 'string',
        defaultValue: '#000000',
        description: 'Pen color for signature'
      },
      {
        key: 'backgroundColor',
        type: 'string',
        defaultValue: '#ffffff',
        description: 'Background color of signature pad'
      },
      {
        key: 'penWidth',
        type: 'number',
        defaultValue: 2,
        description: 'Pen width in pixels',
        min: 1,
        max: 10
      },
      {
        key: 'format',
        type: 'string',
        defaultValue: 'png',
        description: 'Signature image format',
        options: ['png', 'jpeg', 'svg']
      },
      {
        key: 'quality',
        type: 'number',
        defaultValue: 0.92,
        description: 'Image quality (0-1)',
        min: 0.1,
        max: 1
      },
      {
        key: 'clearButton',
        type: 'boolean',
        defaultValue: true,
        description: 'Show clear button'
      },
      {
        key: 'undoButton',
        type: 'boolean',
        defaultValue: true,
        description: 'Show undo button'
      },
      {
        key: 'minSignatureLength',
        type: 'number',
        defaultValue: 10,
        description: 'Minimum signature length in pixels',
        min: 5,
        max: 100
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Contracts', 'Approvals', 'Legal documents', 'Consent forms'],
    accessibility: {
      ariaLabel: 'Digital signature field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const MEDIA_FIELD_CATEGORY: FieldCategory = 'media-file';
