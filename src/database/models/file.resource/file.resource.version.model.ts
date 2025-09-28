import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FileResource } from './file.resource.model';

///////////////////////////////////////////////////////////////////////

@Entity({ name: 'file_resource_versions' })
export class FileResourceVersion extends BaseEntity {
    @Column({ type: 'uuid', nullable: false })
    ResourceId: string;

    @ManyToOne(() => FileResource, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ResourceId' })
    Resource: FileResource;

    @Column({ type: 'varchar', length: 128, nullable: true })
    FileName: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    OriginalFileName: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    Version: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    MimeType: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    StorageKey: string;

    @Column({ type: 'float', default: 0 })
    SizeInKB: number;
}
