import { FieldLibrarySeeder } from '../database/seeders/field.library.seeder';
import { logger } from '../logger/logger';

export class FieldLibrarySeederStartup {
    private seeder: FieldLibrarySeeder;

    constructor() {
        this.seeder = new FieldLibrarySeeder();
    }

    public async initialize(): Promise<void> {
        try {
            logger.info('Initializing field library seeder...');
            
            // Check if already seeded
            const status = await this.seeder.getSeedingStatus();
            
            if (status.isSeeded) {
                logger.info(`Field library already seeded with ${status.totalFields} fields across ${status.categories.length} categories`);
                return;
            }

            // Seed the field library
            await this.seeder.seed();
            logger.info('Field library seeding completed successfully');
            
        } catch (error) {
            logger.error(`Error initializing field library seeder: ${error.message}`);
            throw error;
        }
    }

    public async seedByCategory(category: string): Promise<void> {
        try {
            logger.info(`Seeding field library for category: ${category}`);
            await this.seeder.seedByCategory(category);
            logger.info(`Field library seeding for category '${category}' completed successfully`);
        } catch (error) {
            logger.error(`Error seeding field library for category '${category}': ${error.message}`);
            throw error;
        }
    }

    public async getStatus(): Promise<{
        isSeeded: boolean;
        totalFields: number;
        categories: string[];
    }> {
        return await this.seeder.getSeedingStatus();
    }
}
