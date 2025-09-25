/**
 * Educational field definitions
 * Category: Educational Fields
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const EDUCATIONAL_FIELDS: FieldDefinition[] = [
  {
    id: 'educationLevel',
    name: 'Education Level',
    category: 'educational',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Highest education',
    icon: 'graduation-cap',
    htmlType: 'select',
    component: 'EducationLevelSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Education level is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select education level...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'system',
        type: 'string',
        defaultValue: 'US',
        description: 'Education system',
        options: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN', 'international']
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'no-formal', label: 'No Formal Education' },
          { value: 'high-school', label: 'High School Diploma' },
          { value: 'associates', label: 'Associate Degree' },
          { value: 'bachelors', label: 'Bachelor\'s Degree' },
          { value: 'masters', label: 'Master\'s Degree' },
          { value: 'doctorate', label: 'Doctorate/PhD' },
          { value: 'professional', label: 'Professional Degree' },
          { value: 'other', label: 'Other' }
        ],
        description: 'Education level options'
      },
      {
        key: 'includeInProgress',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "In Progress" options'
      },
      {
        key: 'showYears',
        type: 'boolean',
        defaultValue: false,
        description: 'Show typical years to complete'
      },
      {
        key: 'hierarchical',
        type: 'boolean',
        defaultValue: true,
        description: 'Use hierarchical structure'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Demographics', 'Job applications', 'Student records', 'Academic surveys'],
    accessibility: {
      ariaLabel: 'Education level selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'institution',
    name: 'Institution',
    category: 'educational',
    type: 'text',
    responseType: 'Text',
    description: 'School/university name',
    icon: 'university',
    htmlType: 'text',
    component: 'InstitutionInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Institution name is required'
      },
      {
        type: 'minLength',
        value: 2,
        message: 'Institution name must be at least 2 characters'
      },
      {
        type: 'maxLength',
        value: 200,
        message: 'Institution name must be no more than 200 characters'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter institution name...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'autocomplete',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable autocomplete suggestions'
      },
      {
        key: 'suggestionSource',
        type: 'string',
        defaultValue: 'built-in',
        description: 'Source for suggestions',
        options: ['built-in', 'api', 'custom']
      },
      {
        key: 'institutionType',
        type: 'string',
        defaultValue: 'all',
        description: 'Type of institution',
        options: ['all', 'university', 'college', 'community-college', 'high-school', 'vocational']
      },
      {
        key: 'country',
        type: 'string',
        defaultValue: '',
        description: 'Filter by country'
      },
      {
        key: 'maxLength',
        type: 'number',
        defaultValue: 200,
        description: 'Maximum length',
        min: 10,
        max: 500
      },
      {
        key: 'minLength',
        type: 'number',
        defaultValue: 2,
        description: 'Minimum length',
        min: 1,
        max: 50
      },
      {
        key: 'caseSensitive',
        type: 'boolean',
        defaultValue: false,
        description: 'Case sensitive matching'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Applications', 'Alumni forms', 'Academic records', 'Student verification'],
    accessibility: {
      ariaLabel: 'Institution name input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'graduationYear',
    name: 'Graduation Year',
    category: 'educational',
    type: 'number',
    responseType: 'Integer',
    description: 'Year of graduation',
    icon: 'calendar',
    htmlType: 'number',
    component: 'GraduationYearInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Graduation year is required'
      },
      {
        type: 'min',
        value: 1900,
        message: 'Graduation year must be at least 1900'
      },
      {
        type: 'max',
        value: 2030,
        message: 'Graduation year must be no more than 2030'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter graduation year...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 1900,
        description: 'Minimum graduation year',
        min: 1800,
        max: 2000
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 2030,
        description: 'Maximum graduation year',
        min: 2020,
        max: 2050
      },
      {
        key: 'includeFuture',
        type: 'boolean',
        defaultValue: true,
        description: 'Include future years'
      },
      {
        key: 'includeExpected',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "Expected" option'
      },
      {
        key: 'expectedLabel',
        type: 'string',
        defaultValue: 'Expected',
        description: 'Label for expected graduation'
      },
      {
        key: 'includeInProgress',
        type: 'boolean',
        defaultValue: true,
        description: 'Include "In Progress" option'
      },
      {
        key: 'inProgressLabel',
        type: 'string',
        defaultValue: 'In Progress',
        description: 'Label for in progress'
      },
      {
        key: 'showDecades',
        type: 'boolean',
        defaultValue: false,
        description: 'Show decade ranges'
      }
    ],
    defaultValue: 0,
    required: false,
    useCases: ['Alumni forms', 'Academic records', 'Demographics', 'Student verification'],
    accessibility: {
      ariaLabel: 'Graduation year input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'fieldOfStudy',
    name: 'Field of Study',
    category: 'educational',
    type: 'text',
    responseType: 'Text',
    description: 'Major/specialization',
    icon: 'book',
    htmlType: 'text',
    component: 'FieldOfStudyInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Field of study is required'
      },
      {
        type: 'minLength',
        value: 2,
        message: 'Field of study must be at least 2 characters'
      },
      {
        type: 'maxLength',
        value: 100,
        message: 'Field of study must be no more than 100 characters'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter field of study...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'suggestions',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable field of study suggestions'
      },
      {
        key: 'categories',
        type: 'array',
        defaultValue: [
          'Arts & Humanities',
          'Business & Economics',
          'Engineering & Technology',
          'Health & Medicine',
          'Natural Sciences',
          'Social Sciences',
          'Education',
          'Law',
          'Agriculture',
          'Other'
        ],
        description: 'Field of study categories'
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'computer-science', label: 'Computer Science', category: 'Engineering & Technology' },
          { value: 'business-administration', label: 'Business Administration', category: 'Business & Economics' },
          { value: 'psychology', label: 'Psychology', category: 'Social Sciences' },
          { value: 'medicine', label: 'Medicine', category: 'Health & Medicine' },
          { value: 'english', label: 'English', category: 'Arts & Humanities' }
        ],
        description: 'Field of study options'
      },
      {
        key: 'allowCustom',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow custom field of study entries'
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
    useCases: ['Academic forms', 'Student records', 'Alumni surveys', 'Research studies'],
    accessibility: {
      ariaLabel: 'Field of study input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'gpa',
    name: 'GPA',
    category: 'educational',
    type: 'number',
    responseType: 'Float',
    description: 'Grade point average',
    icon: 'star',
    htmlType: 'number',
    component: 'GPAInput',
    validationOptions: [
      {
        type: 'required',
        message: 'GPA is required'
      },
      {
        type: 'min',
        value: 0,
        message: 'GPA must be at least 0.0'
      },
      {
        type: 'max',
        value: 4.0,
        message: 'GPA must be no more than 4.0'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter GPA...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'scale',
        type: 'string',
        defaultValue: '4.0',
        description: 'GPA scale',
        options: ['4.0', '5.0', '10.0', '100', 'custom']
      },
      {
        key: 'customScale',
        type: 'number',
        defaultValue: 4.0,
        description: 'Custom GPA scale',
        min: 1.0,
        max: 10.0
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0.0,
        description: 'Minimum GPA value',
        min: 0.0,
        max: 2.0
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 4.0,
        description: 'Maximum GPA value',
        min: 2.0,
        max: 10.0
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
        key: 'showLetterGrade',
        type: 'boolean',
        defaultValue: false,
        description: 'Show corresponding letter grade'
      },
      {
        key: 'letterGradeMapping',
        type: 'object',
        defaultValue: {
          'A+': 4.0, 'A': 3.7, 'A-': 3.3,
          'B+': 3.0, 'B': 2.7, 'B-': 2.3,
          'C+': 2.0, 'C': 1.7, 'C-': 1.3,
          'D+': 1.0, 'D': 0.7, 'F': 0.0
        },
        description: 'Letter grade to GPA mapping'
      },
      {
        key: 'includeHonors',
        type: 'boolean',
        defaultValue: false,
        description: 'Include honors designation'
      }
    ],
    defaultValue: 0.0,
    required: false,
    useCases: ['Applications', 'Academic records', 'Scholarship forms', 'Graduate school'],
    accessibility: {
      ariaLabel: 'GPA input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'certifications',
    name: 'Certifications',
    category: 'educational',
    type: 'repeatable',
    responseType: 'Object',
    description: 'Professional certifications',
    icon: 'certificate',
    htmlType: 'text',
    component: 'CertificationsInput',
    validationOptions: [
      {
        type: 'required',
        message: 'At least one certification is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Add certification...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'maxCertifications',
        type: 'number',
        defaultValue: 10,
        description: 'Maximum number of certifications',
        min: 1,
        max: 50
      },
      {
        key: 'minCertifications',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum number of certifications',
        min: 0,
        max: 10
      },
      {
        key: 'fields',
        type: 'array',
        defaultValue: ['name', 'issuer', 'date', 'expiry'],
        description: 'Certification fields to include',
        options: ['name', 'issuer', 'date', 'expiry', 'credential-id', 'url', 'description']
      },
      {
        key: 'suggestions',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable certification suggestions'
      },
      {
        key: 'commonCertifications',
        type: 'array',
        defaultValue: [
          'PMP', 'CPA', 'CFA', 'AWS', 'Google Cloud', 'Microsoft', 'CISSP', 'ITIL'
        ],
        description: 'Common certification suggestions'
      },
      {
        key: 'requireExpiry',
        type: 'boolean',
        defaultValue: false,
        description: 'Require expiry date'
      },
      {
        key: 'allowExpired',
        type: 'boolean',
        defaultValue: true,
        description: 'Allow expired certifications'
      },
      {
        key: 'showExpiryWarning',
        type: 'boolean',
        defaultValue: true,
        description: 'Show warning for expiring certifications'
      }
    ],
    defaultValue: [],
    required: false,
    useCases: ['Professional profiles', 'Resume forms', 'Skill assessments', 'Compliance tracking'],
    accessibility: {
      ariaLabel: 'Certifications input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'currentStudent',
    name: 'Current Student',
    category: 'educational',
    type: 'boolean',
    responseType: 'Boolean',
    description: 'Enrollment status',
    icon: 'user-graduate',
    htmlType: 'checkbox',
    component: 'CurrentStudentInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Please indicate if you are currently a student'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Are you currently a student?',
        description: 'Placeholder text for the field'
      },
      {
        key: 'label',
        type: 'string',
        defaultValue: 'I am currently a student',
        description: 'Label for the checkbox'
      },
      {
        key: 'showDetails',
        type: 'boolean',
        defaultValue: true,
        description: 'Show additional student details'
      },
      {
        key: 'detailsFields',
        type: 'array',
        defaultValue: ['institution', 'program', 'year'],
        description: 'Additional fields to show when student is true',
        options: ['institution', 'program', 'year', 'expected-graduation', 'student-id']
      },
      {
        key: 'conditionalFields',
        type: 'array',
        defaultValue: [],
        description: 'Fields to show/hide based on student status'
      }
    ],
    defaultValue: false,
    required: false,
    useCases: ['Student forms', 'Demographics', 'Eligibility checks', 'Academic surveys'],
    accessibility: {
      ariaLabel: 'Current student status field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'grade',
    name: 'Grade Level',
    category: 'educational',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Current grade level',
    icon: 'school',
    htmlType: 'select',
    component: 'GradeLevelSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Grade level is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select grade level...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'system',
        type: 'string',
        defaultValue: 'K-12',
        description: 'Grade system',
        options: ['K-12', 'college', 'graduate', 'international', 'custom']
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'kindergarten', label: 'Kindergarten' },
          { value: '1st', label: '1st Grade' },
          { value: '2nd', label: '2nd Grade' },
          { value: '3rd', label: '3rd Grade' },
          { value: '4th', label: '4th Grade' },
          { value: '5th', label: '5th Grade' },
          { value: '6th', label: '6th Grade' },
          { value: '7th', label: '7th Grade' },
          { value: '8th', label: '8th Grade' },
          { value: '9th', label: '9th Grade' },
          { value: '10th', label: '10th Grade' },
          { value: '11th', label: '11th Grade' },
          { value: '12th', label: '12th Grade' }
        ],
        description: 'Grade level options'
      },
      {
        key: 'includeCollege',
        type: 'boolean',
        defaultValue: true,
        description: 'Include college grade levels'
      },
      {
        key: 'collegeOptions',
        type: 'array',
        defaultValue: [
          { value: 'freshman', label: 'Freshman' },
          { value: 'sophomore', label: 'Sophomore' },
          { value: 'junior', label: 'Junior' },
          { value: 'senior', label: 'Senior' },
          { value: 'graduate', label: 'Graduate Student' }
        ],
        description: 'College grade level options'
      },
      {
        key: 'ageRange',
        type: 'boolean',
        defaultValue: false,
        description: 'Show typical age range for each grade'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Student management', 'Academic records', 'Age-appropriate content', 'Educational surveys'],
    accessibility: {
      ariaLabel: 'Grade level selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const EDUCATIONAL_FIELD_CATEGORY: FieldCategory = 'educational';
