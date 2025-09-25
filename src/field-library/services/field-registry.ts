/**
 * Field Registry - Central registry for all field definitions
 */

import { FieldDefinition, FieldCategory, FieldInstance } from '../types/field.types';
import { TEXT_FIELDS } from '../categories/text-fields';
import { NUMERIC_FIELDS } from '../categories/numeric-fields';
import { SELECTION_FIELDS } from '../categories/selection-fields';
import { DATE_TIME_FIELDS } from '../categories/date-time-fields';
import { RATING_FEEDBACK_FIELDS } from '../categories/rating-feedback-fields';
import { MEASUREMENT_FIELDS } from '../categories/measurement-fields';
import { GEOGRAPHIC_FIELDS } from '../categories/geographic-fields';
import { MEDIA_FIELDS } from '../categories/media-fields';
import { HEALTHCARE_FIELDS } from '../categories/healthcare-fields';
import { BUSINESS_FIELDS } from '../categories/business-fields';
import { EDUCATIONAL_FIELDS } from '../categories/educational-fields';
import { ECOMMERCE_FIELDS } from '../categories/ecommerce-fields';
import { SURVEY_FIELDS } from '../categories/survey-fields';
import { INTERACTIVE_FIELDS } from '../categories/interactive-fields';

export class FieldRegistry {
  private static instance: FieldRegistry;
  private fields: Map<string, FieldDefinition> = new Map();
  private categories: Map<FieldCategory, FieldDefinition[]> = new Map();

  private constructor() {
    this.initializeFields();
  }

  public static getInstance(): FieldRegistry {
    if (!FieldRegistry.instance) {
      FieldRegistry.instance = new FieldRegistry();
    }
    return FieldRegistry.instance;
  }

  private initializeFields(): void {
    // Register text fields
    TEXT_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register numeric fields
    NUMERIC_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register selection fields
    SELECTION_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register date-time fields
    DATE_TIME_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register rating & feedback fields
    RATING_FEEDBACK_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register measurement fields
    MEASUREMENT_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register geographic fields
    GEOGRAPHIC_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register media fields
    MEDIA_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register healthcare fields
    HEALTHCARE_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register business fields
    BUSINESS_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register educational fields
    EDUCATIONAL_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register e-commerce fields
    ECOMMERCE_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register survey fields
    SURVEY_FIELDS.forEach(field => {
      this.registerField(field);
    });

    // Register interactive fields
    INTERACTIVE_FIELDS.forEach(field => {
      this.registerField(field);
    });
  }

  /**
   * Register a field definition
   */
  public registerField(field: FieldDefinition): void {
    this.fields.set(field.id, field);
    
    if (!this.categories.has(field.category)) {
      this.categories.set(field.category, []);
    }
    this.categories.get(field.category)!.push(field);
  }

  /**
   * Get a field definition by ID
   */
  public getField(fieldId: string): FieldDefinition | undefined {
    return this.fields.get(fieldId);
  }

  /**
   * Get all field definitions
   */
  public getAllFields(): FieldDefinition[] {
    return Array.from(this.fields.values());
  }

  /**
   * Get fields by category
   */
  public getFieldsByCategory(category: FieldCategory): FieldDefinition[] {
    return this.categories.get(category) || [];
  }

  /**
   * Get all categories
   */
  public getCategories(): FieldCategory[] {
    return Array.from(this.categories.keys());
  }

  /**
   * Search fields by name or description
   */
  public searchFields(query: string): FieldDefinition[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getAllFields().filter(field => 
      field.name.toLowerCase().includes(lowercaseQuery) ||
      field.description.toLowerCase().includes(lowercaseQuery) ||
      field.useCases.some(useCase => useCase.toLowerCase().includes(lowercaseQuery))
    );
  }

  /**
   * Get fields by response type
   */
  public getFieldsByResponseType(responseType: string): FieldDefinition[] {
    return this.getAllFields().filter(field => field.responseType === responseType);
  }

  /**
   * Check if a field exists
   */
  public hasField(fieldId: string): boolean {
    return this.fields.has(fieldId);
  }

  /**
   * Get field count by category
   */
  public getFieldCountByCategory(): Map<FieldCategory, number> {
    const counts = new Map<FieldCategory, number>();
    this.categories.forEach((fields, category) => {
      counts.set(category, fields.length);
    });
    return counts;
  }

  /**
   * Get field statistics
   */
  public getStatistics(): {
    totalFields: number;
    categories: number;
    fieldCountByCategory: Map<FieldCategory, number>;
    responseTypes: string[];
  } {
    const responseTypes = new Set<string>();
    this.getAllFields().forEach(field => {
      responseTypes.add(field.responseType);
    });

    return {
      totalFields: this.fields.size,
      categories: this.categories.size,
      fieldCountByCategory: this.getFieldCountByCategory(),
      responseTypes: Array.from(responseTypes)
    };
  }

  /**
   * Create a field instance from a field definition
   */
  public createFieldInstance(fieldId: string, configuration?: Record<string, any>): FieldInstance | null {
    const definition = this.getField(fieldId);
    if (!definition) {
      return null;
    }

    return {
      id: `${fieldId}_${Date.now()}`,
      definition,
      value: definition.defaultValue,
      isValid: true,
      errors: [],
      warnings: [],
      isVisible: true,
      isEnabled: true,
      isRequired: definition.required,
      configuration: configuration || {},
      metadata: {
        created: new Date(),
        modified: new Date(),
        version: '1.0.0'
      }
    };
  }

  /**
   * Get field recommendations based on use case
   */
  public getFieldRecommendations(useCase: string): FieldDefinition[] {
    const lowercaseUseCase = useCase.toLowerCase();
    return this.getAllFields().filter(field =>
      field.useCases.some(uc => uc.toLowerCase().includes(lowercaseUseCase))
    );
  }

  /**
   * Get similar fields based on configuration
   */
  public getSimilarFields(fieldId: string, limit: number = 5): FieldDefinition[] {
    const field = this.getField(fieldId);
    if (!field) return [];

    const similar = this.getAllFields()
      .filter(f => f.id !== fieldId && f.category === field.category)
      .map(f => ({
        field: f,
        score: this.calculateSimilarity(field, f)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.field);

    return similar;
  }

  private calculateSimilarity(field1: FieldDefinition, field2: FieldDefinition): number {
    let score = 0;
    
    // Same response type
    if (field1.responseType === field2.responseType) score += 2;
    
    // Similar validation options
    const validation1 = field1.validationOptions.map(v => v.type);
    const validation2 = field2.validationOptions.map(v => v.type);
    const commonValidations = validation1.filter(v => validation2.includes(v));
    score += commonValidations.length * 0.5;
    
    // Similar configuration options
    const config1 = field1.configurationOptions.map(c => c.key);
    const config2 = field2.configurationOptions.map(c => c.key);
    const commonConfigs = config1.filter(c => config2.includes(c));
    score += commonConfigs.length * 0.3;
    
    return score;
  }

  /**
   * Export field definitions
   */
  public exportFields(): string {
    return JSON.stringify({
      fields: this.getAllFields(),
      categories: Array.from(this.categories.entries()),
      statistics: this.getStatistics()
    }, null, 2);
  }

  /**
   * Import field definitions
   */
  public importFields(data: any): void {
    if (data.fields && Array.isArray(data.fields)) {
      data.fields.forEach((field: FieldDefinition) => {
        this.registerField(field);
      });
    }
  }

  /**
   * Clear all fields
   */
  public clear(): void {
    this.fields.clear();
    this.categories.clear();
  }

  /**
   * Remove a field
   */
  public removeField(fieldId: string): boolean {
    const field = this.fields.get(fieldId);
    if (!field) return false;

    this.fields.delete(fieldId);
    
    const categoryFields = this.categories.get(field.category);
    if (categoryFields) {
      const index = categoryFields.findIndex(f => f.id === fieldId);
      if (index !== -1) {
        categoryFields.splice(index, 1);
      }
    }

    return true;
  }
}
