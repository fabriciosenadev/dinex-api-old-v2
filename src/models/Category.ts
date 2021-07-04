import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("dx_categories")
export class Category {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @Column()
    name: string;

    @Column()
    applicable: number;

    @Column()
    is_custom: number;

    @CreateDateColumn()
    created_on: Date;
}
