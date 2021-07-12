import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";


@Entity("dx_launches")
export class Launch {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @Column()
    date: Date;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string; 

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    value: number;

    @Column()
    status: number;   

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn({
        type: "datetime",
        nullable: true
    })
    updated_on: Date;

    @DeleteDateColumn({
        type: "datetime",
        nullable: true
    })
    deleted_on: Date;
}