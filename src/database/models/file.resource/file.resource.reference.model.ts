import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FileResource } from './file.resource.model';

///////////////////////////////////////////////////////////////////////

@Entity({ name: 'file_resource_references' })
export class FileResourceReference extends BaseEntity {
    @Column({ type: 'uuid', nullable: false })
    ResourceId: string;

    @ManyToOne(() => FileResource, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ResourceId' })
    Resource: FileResource;

    @Column({ type: 'uuid', nullable: false })
    ReferenceId: string;

    @Column({ type: 'varchar', length: 32, nullable: true })
    Type: string;

    @Column({ type: 'varchar', length: 32, nullable: true })
    Keyword: string;
}
