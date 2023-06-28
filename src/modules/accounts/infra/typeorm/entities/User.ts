import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Address } from '@modules/address/infra/typeorm/entities/Address';

@Entity('users')
class User {
    
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Address)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @Column()
    address_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };