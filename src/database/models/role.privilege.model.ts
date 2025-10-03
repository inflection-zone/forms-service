import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Role } from './role.model';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'role_privileges' })
export class RolePrivilege {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    RoleId: number;

    @Column({ type: 'varchar', length: 32, nullable: true })
    RoleName?: string;
    
    @Column({ type: 'varchar', length: 256, nullable: true })
    Privilege?: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt?: Date;

    @DeleteDateColumn()
    DeletedAt?: Date;

    @ManyToOne(() => Role, role => role.RolePrivileges)
    @JoinColumn({ name: 'RoleId' })
    Role: Role;
}
