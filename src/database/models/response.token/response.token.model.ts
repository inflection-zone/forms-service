import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('response_tokens')
@Index('IDX_RESPONSE_ID', ['responseId'], { unique: true })
@Index('IDX_USED_TOKEN', ['usedToken'])
export class ResponseToken extends BaseEntity {
    @Column({ type: 'uuid', unique: true, nullable: false })
    responseId: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    usedToken: string;

    @Column({ type: 'uuid', nullable: true })
    formShareId: string;

    @ManyToOne('FormShare', 'ResponseTokens')
    @JoinColumn({ name: 'formShareId' })
    FormShare: any;
}
