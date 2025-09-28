import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FormTemplate } from '../form.template/form.template.model';

export enum ShareType {
    SINGLE = 'single',
    MULTIPLE = 'multiple'
}

@Entity('form_shares')
@Index('IDX_SHARE_TOKEN', ['shareToken'], { unique: true })
@Index('IDX_FORM_ID', ['formId'])
export class FormShare extends BaseEntity {
    @Column({ type: 'uuid', nullable: false })
    formId: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    shareToken: string;

    @Column({
        type: 'enum',
        enum: ShareType,
        default: ShareType.SINGLE,
        nullable: false
    })
    shareType: ShareType;

    @Column({ type: 'timestamp', nullable: true })
    expiresAt: Date;

    @Column({ type: 'json', nullable: true, comment: 'Array of tokens for multiple links' })
    tokens: string[];

    @Column({ type: 'json', nullable: true, comment: 'Array of {email: string, token: string} for email sharing' })
    emails: Array<{ email: string; token: string }>;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ManyToOne(() => FormTemplate, template => template.FormShares)
    @JoinColumn({ name: 'formId' })
    FormTemplate: FormTemplate;

    @OneToMany('ResponseToken', 'FormShare')
    ResponseTokens: any[];
}
