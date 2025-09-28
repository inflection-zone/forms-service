import { FieldLibraryService } from '../services/field.library.service';
import { FieldLibraryCreateModel } from '../../domain.types/field.library.domain.types';
import { logger } from '../../logger/logger';

// Import all field definitions from the field library
import { TEXT_FIELDS } from '../../field-library/categories/text-fields';
import { NUMERIC_FIELDS } from '../../field-library/categories/numeric-fields';
import { SELECTION_FIELDS } from '../../field-library/categories/selection-fields';
import { DATE_TIME_FIELDS } from '../../field-library/categories/date-time-fields';
import { RATING_FEEDBACK_FIELDS } from '../../field-library/categories/rating-feedback-fields';
import { MEASUREMENT_FIELDS } from '../../field-library/categories/measurement-fields';
import { GEOGRAPHIC_FIELDS } from '../../field-library/categories/geographic-fields';
import { MEDIA_FIELDS } from '../../field-library/categories/media-fields';
import { HEALTHCARE_FIELDS } from '../../field-library/categories/healthcare-fields';
import { BUSINESS_FIELDS } from '../../field-library/categories/business-fields';
import { EDUCATIONAL_FIELDS } from '../../field-library/categories/educational-fields';
import { ECOMMERCE_FIELDS } from '../../field-library/categories/ecommerce-fields';
import { SURVEY_FIELDS } from '../../field-library/categories/survey-fields';
import { INTERACTIVE_FIELDS } from '../../field-library/categories/interactive-fields';

export class FieldLibrarySeeder {
    private fieldLibraryService: FieldLibraryService;

    constructor() {
        this.fieldLibraryService = new FieldLibraryService();
    }

    public async seed(): Promise<void> {
        try {
            logger.info('Starting field library seeding...');

            // Clear existing data
            await this.fieldLibraryService.clearAll();
            logger.info('Cleared existing field library data');

            // Prepare all field definitions
            const allFields = [
                ...TEXT_FIELDS,
                ...NUMERIC_FIELDS,
                ...SELECTION_FIELDS,
                ...DATE_TIME_FIELDS,
                ...RATING_FEEDBACK_FIELDS,
                ...MEASUREMENT_FIELDS,
                ...GEOGRAPHIC_FIELDS,
                ...MEDIA_FIELDS,
                ...HEALTHCARE_FIELDS,
                ...BUSINESS_FIELDS,
                ...EDUCATIONAL_FIELDS,
                ...ECOMMERCE_FIELDS,
                ...SURVEY_FIELDS,
                ...INTERACTIVE_FIELDS,
            ];

            // Convert field definitions to create models
            const createModels: FieldLibraryCreateModel[] = allFields.map((field, index) => ({
                FieldId: field.id,
                Name: field.name,
                Category: field.category,
                Type: field.type,
                ResponseType: field.responseType,
                Description: field.description,
                Icon: field.icon,
                ValidationOptions: field.validationOptions,
                ConfigurationOptions: field.configurationOptions,
                DefaultValue: field.defaultValue,
                IsRequired: field.required,
                Dependencies: field.dependencies,
                UseCases: field.useCases,
                Accessibility: field.accessibility,
                HtmlType: field.htmlType,
                Component: field.component,
                Schema: field.schema,
                Logic: field.logic,
                Sequence: index + 1,
                IsActive: true,
                Tags: field.useCases?.join(', ') || '',
                Version: '1.0.0',
            }));

            // Bulk create all fields
            await this.fieldLibraryService.bulkCreate(createModels);
            logger.info(`Successfully seeded ${createModels.length} field library entries`);

            // Log statistics
            const stats = await this.fieldLibraryService.getStatistics();
            logger.info(`Field library seeding completed with statistics: ${JSON.stringify({
                totalFields: stats.TotalFields,
                activeFields: stats.ActiveFields,
                categories: stats.Categories.length,
                responseTypes: stats.ResponseTypes.length,
            })}`);

        } catch (error) {
            logger.error(`Error seeding field library: ${error.message}`);
            throw error;
        }
    }

    public async seedByCategory(category: string): Promise<void> {
        try {
            logger.info(`Starting field library seeding for category: ${category}`);

            let fields: any[] = [];
            
            switch (category) {
                case 'text-based':
                    fields = TEXT_FIELDS;
                    break;
                case 'numeric':
                    fields = NUMERIC_FIELDS;
                    break;
                case 'selection-choice':
                    fields = SELECTION_FIELDS;
                    break;
                case 'date-time':
                    fields = DATE_TIME_FIELDS;
                    break;
                case 'rating-feedback':
                    fields = RATING_FEEDBACK_FIELDS;
                    break;
                case 'measurement':
                    fields = MEASUREMENT_FIELDS;
                    break;
                case 'geographic':
                    fields = GEOGRAPHIC_FIELDS;
                    break;
                case 'media-file':
                    fields = MEDIA_FIELDS;
                    break;
                case 'healthcare':
                    fields = HEALTHCARE_FIELDS;
                    break;
                case 'business-professional':
                    fields = BUSINESS_FIELDS;
                    break;
                case 'educational':
                    fields = EDUCATIONAL_FIELDS;
                    break;
                case 'e-commerce':
                    fields = ECOMMERCE_FIELDS;
                    break;
                case 'survey-research':
                    fields = SURVEY_FIELDS;
                    break;
                case 'interactive-advanced':
                    fields = INTERACTIVE_FIELDS;
                    break;
                default:
                    throw new Error(`Unknown category: ${category}`);
            }

            // Convert field definitions to create models
            const createModels: FieldLibraryCreateModel[] = fields.map((field, index) => ({
                FieldId: field.id,
                Name: field.name,
                Category: field.category,
                Type: field.type,
                ResponseType: field.responseType,
                Description: field.description,
                Icon: field.icon,
                ValidationOptions: field.validationOptions,
                ConfigurationOptions: field.configurationOptions,
                DefaultValue: field.defaultValue,
                IsRequired: field.required,
                Dependencies: field.dependencies,
                UseCases: field.useCases,
                Accessibility: field.accessibility,
                HtmlType: field.htmlType,
                Component: field.component,
                Schema: field.schema,
                Logic: field.logic,
                Sequence: index + 1,
                IsActive: true,
                Tags: field.useCases?.join(', ') || '',
                Version: '1.0.0',
            }));

            // Bulk create fields for this category
            await this.fieldLibraryService.bulkCreate(createModels);
            logger.info(`Successfully seeded ${createModels.length} field library entries for category: ${category}`);

        } catch (error) {
            logger.error(`Error seeding field library for category ${category}: ${error.message}`);
            throw error;
        }
    }

    public async getSeedingStatus(): Promise<{
        isSeeded: boolean;
        totalFields: number;
        categories: string[];
    }> {
        try {
            const stats = await this.fieldLibraryService.getStatistics();
            return {
                isSeeded: stats.TotalFields > 0,
                totalFields: stats.TotalFields,
                categories: stats.Categories.map(c => c.Category),
            };
        } catch (error) {
            logger.error(`Error getting seeding status: ${error.message}`);
            return {
                isSeeded: false,
                totalFields: 0,
                categories: [],
            };
        }
    }
}
