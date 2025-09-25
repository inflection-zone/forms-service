import {
    Entity,
    Column,
    Index,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'field_library' })
@Index(['Category', 'Type'])
@Index(['IsActive'])
export class FieldLibrary extends BaseEntity {
    @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
    FieldId: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
    Name: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    Category: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    Type: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    ResponseType: string;

    @Column({ type: 'text', nullable: true })
    Description?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    Icon?: string;

    @Column({ type: 'json', nullable: true })
    ValidationOptions?: string;

    @Column({ type: 'json', nullable: true })
    ConfigurationOptions?: string;

    @Column({ type: 'json', nullable: true })
    DefaultValue?: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    IsRequired: boolean;

    @Column({ type: 'json', nullable: true })
    Dependencies?: string;

    @Column({ type: 'json', nullable: true })
    UseCases?: string;

    @Column({ type: 'json', nullable: true })
    Accessibility?: string;

    @Column({ type: 'varchar', length: 32, nullable: true })
    HtmlType?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    Component?: string;

    @Column({ type: 'json', nullable: true })
    Schema?: string;

    @Column({ type: 'json', nullable: true })
    Logic?: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    Sequence: number;

    @Column({ type: 'boolean', nullable: false, default: true })
    IsActive: boolean;

    @Column({ type: 'varchar', length: 512, nullable: true })
    Tags?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    Version?: string;
}
