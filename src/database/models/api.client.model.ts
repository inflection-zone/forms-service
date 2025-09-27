import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'api_clients' })
export class ApiClient {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    ClientName: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    FirstName?: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    LastName?: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    ClientCode: string;

    @Column({ type: 'varchar', length: 10, nullable: false, default: '+91' })
    CountryCode: string;

    @Column({ type: 'varchar', length: 16, nullable: true })
    Phone?: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    Email?: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    Password?: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    IsPrivileged: boolean;

    @Column({ type: 'varchar', length: 256, nullable: false })
    ApiKey: string;

    @Column({ type: 'timestamp', nullable: true })
    ValidFrom?: Date;

    @Column({ type: 'timestamp', nullable: true })
    ValidTill?: Date;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt?: Date;

    @DeleteDateColumn()
    DeletedAt?: Date;

    // Associations can be added here when needed
    // Example:
    // @ManyToOne(() => User, user => user.apiClients)
    // @JoinColumn({ name: 'OwnerUserId' })
    // OwnerUser: User;
}
