/**
 * E-commerce field definitions
 * Category: E-commerce Fields (Product & Shopping)
 */

import { FieldDefinition, FieldCategory, ResponseType, ValidationType, ConfigurationType } from '../types/field.types';

export const ECOMMERCE_FIELDS: FieldDefinition[] = [
  {
    id: 'productCategory',
    name: 'Product Category',
    category: 'e-commerce',
    type: 'hierarchical',
    responseType: 'SingleChoiceSelection',
    description: 'Nested categories',
    icon: 'material-symbols:tag',
    htmlType: 'select',
    component: 'ProductCategorySelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Product category is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select category...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'levels',
        type: 'number',
        defaultValue: 3,
        description: 'Number of category levels',
        min: 1,
        max: 6
      },
      {
        key: 'hierarchy',
        type: 'array',
        defaultValue: [
          {
            value: 'electronics',
            label: 'Electronics',
            children: [
              {
                value: 'phones',
                label: 'Phones',
                children: [
                  { value: 'smartphones', label: 'Smartphones' },
                  { value: 'accessories', label: 'Phone Accessories' }
                ]
              },
              {
                value: 'computers',
                label: 'Computers',
                children: [
                  { value: 'laptops', label: 'Laptops' },
                  { value: 'desktops', label: 'Desktops' }
                ]
              }
            ]
          }
        ],
        description: 'Category hierarchy structure'
      },
      {
        key: 'searchable',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable search functionality'
      },
      {
        key: 'showCounts',
        type: 'boolean',
        defaultValue: false,
        description: 'Show product counts for each category'
      },
      {
        key: 'allowMultiple',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow multiple category selection'
      },
      {
        key: 'maxSelections',
        type: 'number',
        defaultValue: 5,
        description: 'Maximum number of categories',
        min: 1,
        max: 20
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Product catalog', 'Inventory management', 'Product filtering', 'Category navigation'],
    accessibility: {
      ariaLabel: 'Product category selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'priceRange',
    name: 'Price Range',
    category: 'e-commerce',
    type: 'range',
    responseType: 'Object',
    description: 'Price filter',
    icon: 'material-symbols:attach-money',
    htmlType: 'text',
    component: 'PriceRangeInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Price range is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select price range...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'currency',
        type: 'string',
        defaultValue: 'USD',
        description: 'Currency for price range',
        options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY']
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 0,
        description: 'Minimum price value',
        min: 0,
        max: 10000
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 10000,
        description: 'Maximum price value',
        min: 100,
        max: 1000000
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 10,
        description: 'Price step increment',
        min: 1,
        max: 1000
      },
      {
        key: 'presets',
        type: 'array',
        defaultValue: [
          { label: 'Under $25', value: { min: 0, max: 25 } },
          { label: '$25 - $50', value: { min: 25, max: 50 } },
          { label: '$50 - $100', value: { min: 50, max: 100 } },
          { label: '$100 - $250', value: { min: 100, max: 250 } },
          { label: '$250+', value: { min: 250, max: 10000 } }
        ],
        description: 'Predefined price ranges'
      },
      {
        key: 'showCurrency',
        type: 'boolean',
        defaultValue: true,
        description: 'Show currency symbol'
      },
      {
        key: 'showSlider',
        type: 'boolean',
        defaultValue: true,
        description: 'Show price range slider'
      },
      {
        key: 'showInputs',
        type: 'boolean',
        defaultValue: true,
        description: 'Show min/max input fields'
      }
    ],
    defaultValue: { min: 0, max: 10000 },
    required: false,
    useCases: ['Product search', 'Price filtering', 'Budget selection', 'Product comparison'],
    accessibility: {
      ariaLabel: 'Price range selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'quantity',
    name: 'Quantity',
    category: 'e-commerce',
    type: 'number',
    responseType: 'Integer',
    description: 'Item quantity',
    icon: 'material-symbols:shopping-cart',
    htmlType: 'number',
    component: 'QuantityInput',
    validationOptions: [
      {
        type: 'required',
        message: 'Quantity is required'
      },
      {
        type: 'min',
        value: 1,
        message: 'Quantity must be at least 1'
      },
      {
        type: 'max',
        value: 100,
        message: 'Quantity must be no more than 100'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter quantity...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'min',
        type: 'number',
        defaultValue: 1,
        description: 'Minimum quantity',
        min: 0,
        max: 10
      },
      {
        key: 'max',
        type: 'number',
        defaultValue: 100,
        description: 'Maximum quantity',
        min: 10,
        max: 1000
      },
      {
        key: 'step',
        type: 'number',
        defaultValue: 1,
        description: 'Quantity step increment',
        min: 1,
        max: 10
      },
      {
        key: 'stockValidation',
        type: 'boolean',
        defaultValue: true,
        description: 'Validate against stock availability'
      },
      {
        key: 'stockFieldId',
        type: 'string',
        defaultValue: '',
        description: 'Stock field ID for validation'
      },
      {
        key: 'showStock',
        type: 'boolean',
        defaultValue: true,
        description: 'Show stock availability'
      },
      {
        key: 'bulkPricing',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable bulk pricing tiers'
      },
      {
        key: 'pricingTiers',
        type: 'array',
        defaultValue: [
          { min: 1, max: 9, discount: 0 },
          { min: 10, max: 49, discount: 5 },
          { min: 50, max: 99, discount: 10 },
          { min: 100, max: 999, discount: 15 }
        ],
        description: 'Bulk pricing tiers'
      }
    ],
    defaultValue: 1,
    required: false,
    useCases: ['Shopping cart', 'Order forms', 'Inventory management', 'Bulk purchases'],
    accessibility: {
      ariaLabel: 'Quantity input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'size',
    name: 'Size',
    category: 'e-commerce',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Product size',
    icon: 'material-symbols:straighten',
    htmlType: 'select',
    component: 'SizeSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Size is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select size...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'category',
        type: 'string',
        defaultValue: 'clothing',
        description: 'Size category',
        options: ['clothing', 'shoes', 'electronics', 'furniture', 'jewelry', 'custom']
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'XS', label: 'XS' },
          { value: 'S', label: 'S' },
          { value: 'M', label: 'M' },
          { value: 'L', label: 'L' },
          { value: 'XL', label: 'XL' },
          { value: 'XXL', label: 'XXL' }
        ],
        description: 'Size options'
      },
      {
        key: 'showSizeChart',
        type: 'boolean',
        defaultValue: true,
        description: 'Show size chart'
      },
      {
        key: 'sizeChartUrl',
        type: 'string',
        defaultValue: '',
        description: 'URL to size chart'
      },
      {
        key: 'availability',
        type: 'boolean',
        defaultValue: true,
        description: 'Show size availability'
      },
      {
        key: 'measurements',
        type: 'boolean',
        defaultValue: false,
        description: 'Show size measurements'
      },
      {
        key: 'international',
        type: 'boolean',
        defaultValue: false,
        description: 'Include international sizes'
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Clothing', 'Shoes', 'Furniture', 'Jewelry', 'Electronics'],
    accessibility: {
      ariaLabel: 'Size selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'color',
    name: 'Color',
    category: 'e-commerce',
    type: 'select',
    responseType: 'SingleChoiceSelection',
    description: 'Product color',
    icon: 'material-symbols:palette',
    htmlType: 'select',
    component: 'ColorSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Color is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select color...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'black', label: 'Black', hex: '#000000' },
          { value: 'white', label: 'White', hex: '#FFFFFF' },
          { value: 'red', label: 'Red', hex: '#FF0000' },
          { value: 'blue', label: 'Blue', hex: '#0000FF' },
          { value: 'green', label: 'Green', hex: '#00FF00' },
          { value: 'yellow', label: 'Yellow', hex: '#FFFF00' }
        ],
        description: 'Color options with hex codes'
      },
      {
        key: 'showSwatches',
        type: 'boolean',
        defaultValue: true,
        description: 'Show color swatches'
      },
      {
        key: 'swatchSize',
        type: 'string',
        defaultValue: 'medium',
        description: 'Color swatch size',
        options: ['small', 'medium', 'large']
      },
      {
        key: 'showNames',
        type: 'boolean',
        defaultValue: true,
        description: 'Show color names'
      },
      {
        key: 'showHex',
        type: 'boolean',
        defaultValue: false,
        description: 'Show hex color codes'
      },
      {
        key: 'availability',
        type: 'boolean',
        defaultValue: true,
        description: 'Show color availability'
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'grid',
        description: 'Color selection layout',
        options: ['grid', 'horizontal', 'vertical']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Product options', 'Customization', 'Visual selection', 'Product variants'],
    accessibility: {
      ariaLabel: 'Color selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'shippingMethod',
    name: 'Shipping Method',
    category: 'e-commerce',
    type: 'radio',
    responseType: 'SingleChoiceSelection',
    description: 'Delivery options',
    icon: 'material-symbols:local-shipping',
    htmlType: 'radio',
    component: 'ShippingMethodSelect',
    validationOptions: [
      {
        type: 'required',
        message: 'Shipping method is required'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Select shipping method...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'options',
        type: 'array',
        defaultValue: [
          { value: 'standard', label: 'Standard Shipping', cost: 5.99, days: '5-7' },
          { value: 'express', label: 'Express Shipping', cost: 12.99, days: '2-3' },
          { value: 'overnight', label: 'Overnight Shipping', cost: 24.99, days: '1' },
          { value: 'pickup', label: 'Store Pickup', cost: 0, days: 'Same day' }
        ],
        description: 'Shipping method options'
      },
      {
        key: 'showCost',
        type: 'boolean',
        defaultValue: true,
        description: 'Show shipping cost'
      },
      {
        key: 'showDeliveryTime',
        type: 'boolean',
        defaultValue: true,
        description: 'Show delivery time'
      },
      {
        key: 'freeShippingThreshold',
        type: 'number',
        defaultValue: 50,
        description: 'Free shipping threshold',
        min: 0,
        max: 1000
      },
      {
        key: 'currency',
        type: 'string',
        defaultValue: 'USD',
        description: 'Currency for shipping costs',
        options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']
      },
      {
        key: 'layout',
        type: 'string',
        defaultValue: 'vertical',
        description: 'Layout orientation',
        options: ['vertical', 'horizontal', 'grid']
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Checkout', 'Order processing', 'Delivery options', 'Shipping calculation'],
    accessibility: {
      ariaLabel: 'Shipping method selection field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'couponCode',
    name: 'Coupon Code',
    category: 'e-commerce',
    type: 'text',
    responseType: 'Text',
    description: 'Discount code',
    icon: 'material-symbols:tag',
    htmlType: 'text',
    component: 'CouponCodeInput',
    validationOptions: [
      {
        type: 'maxLength',
        value: 20,
        message: 'Coupon code must be no more than 20 characters'
      }
    ],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Enter coupon code...',
        description: 'Placeholder text for the field'
      },
      {
        key: 'maxLength',
        type: 'number',
        defaultValue: 20,
        description: 'Maximum code length',
        min: 3,
        max: 50
      },
      {
        key: 'minLength',
        type: 'number',
        defaultValue: 3,
        description: 'Minimum code length',
        min: 1,
        max: 20
      },
      {
        key: 'caseSensitive',
        type: 'boolean',
        defaultValue: false,
        description: 'Case sensitive validation'
      },
      {
        key: 'validateOnChange',
        type: 'boolean',
        defaultValue: true,
        description: 'Validate code on change'
      },
      {
        key: 'showValidation',
        type: 'boolean',
        defaultValue: true,
        description: 'Show validation feedback'
      },
      {
        key: 'allowMultiple',
        type: 'boolean',
        defaultValue: false,
        description: 'Allow multiple coupon codes'
      },
      {
        key: 'maxCoupons',
        type: 'number',
        defaultValue: 1,
        description: 'Maximum number of coupons',
        min: 1,
        max: 5
      }
    ],
    defaultValue: '',
    required: false,
    useCases: ['Promotions', 'Discount codes', 'Checkout', 'Marketing campaigns'],
    accessibility: {
      ariaLabel: 'Coupon code input field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  },
  {
    id: 'wishlist',
    name: 'Wishlist',
    category: 'e-commerce',
    type: 'checkbox',
    responseType: 'Boolean',
    description: 'Add to wishlist',
    icon: 'material-symbols:favorite',
    htmlType: 'checkbox',
    component: 'WishlistInput',
    validationOptions: [],
    configurationOptions: [
      {
        key: 'placeholder',
        type: 'string',
        defaultValue: 'Add to wishlist',
        description: 'Placeholder text for the field'
      },
      {
        key: 'label',
        type: 'string',
        defaultValue: 'Add to wishlist',
        description: 'Label for the checkbox'
      },
      {
        key: 'icon',
        type: 'string',
        defaultValue: 'heart',
        description: 'Icon for wishlist button',
        options: ['heart', 'star', 'bookmark', 'plus']
      },
      {
        key: 'showCount',
        type: 'boolean',
        defaultValue: false,
        description: 'Show wishlist count'
      },
      {
        key: 'requireLogin',
        type: 'boolean',
        defaultValue: true,
        description: 'Require user login'
      },
      {
        key: 'showTooltip',
        type: 'boolean',
        defaultValue: true,
        description: 'Show tooltip on hover'
      },
      {
        key: 'tooltipText',
        type: 'string',
        defaultValue: 'Add to your wishlist',
        description: 'Tooltip text'
      }
    ],
    defaultValue: false,
    required: false,
    useCases: ['Product pages', 'Shopping experience', 'User preferences', 'Marketing'],
    accessibility: {
      ariaLabel: 'Add to wishlist field',
      keyboardNavigation: true,
      screenReaderSupport: true
    }
  }
];

export const ECOMMERCE_FIELD_CATEGORY: FieldCategory = 'e-commerce';
