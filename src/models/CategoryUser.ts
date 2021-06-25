import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { User } from "./User";

@Entity("categories_users")
export class CategoryUser {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column()
    category_id: number;

    @ManyToOne(()=> Category)
    @JoinColumn({ name: "category_id"})
    category: Category

    @CreateDateColumn()
    created_on: Date

    @DeleteDateColumn({
        type: "datetime",
        nullable: true
    })
    deleted_on: Date

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
