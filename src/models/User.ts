import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("user")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };