import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { RolePrivilege } from './role.privilege.model';

////////////////////////////////////////////////////////////////////////

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 32, nullable: false })
    RoleName: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    Description?: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt?: Date;

    @DeleteDateColumn()
    DeletedAt?: Date;

    @OneToMany(() => RolePrivilege, rolePrivilege => rolePrivilege.Role)
    RolePrivileges: RolePrivilege[];
}
