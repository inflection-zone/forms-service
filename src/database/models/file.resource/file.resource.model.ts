import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { User } from '../user/user.model';
import { FileResourceVersion } from './file.resource.version.model';

///////////////////////////////////////////////////////////////////////

@Entity({ name: 'file_resources' })
export class FileResource extends BaseEntity {
    @Column({ type: 'varchar', length: 128, nullable: true })
    FileName: string;

    @Column({ type: 'uuid', nullable: true })
    OwnerUserId: string;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'OwnerUserId' })
    OwnerUser?: User;

    @Column({ type: 'uuid', nullable: true })
    UploadedByUserId: string;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'UploadedByUserId' })
    UploadedByUser?: User;

    @Column({ type: 'boolean', default: false })
    IsPublicResource: boolean;

    @Column({ type: 'boolean', default: false })
    IsMultiResolutionImage: boolean;

    // Comma separated string list (JSON string expected by mapper)
    @Column({ type: 'varchar', length: 2048, nullable: true })
    Tags: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    MimeType: string;

    @Column({ type: 'uuid', nullable: true })
    DefaultVersionId: string;

    @OneToOne(() => FileResourceVersion, { nullable: true })
    @JoinColumn({ name: 'DefaultVersionId' })
    DefaultVersion?: FileResourceVersion;

    @Column({ type: 'timestamp', nullable: true })
    UploadedDate: Date;
}
