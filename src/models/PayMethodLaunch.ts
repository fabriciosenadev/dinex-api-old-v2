import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Launch } from "./Launch";

@Entity("dx_pay_methods_launches")
export class PayMethodLaunch {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    pay_method: number;

    @OneToOne(() => Launch)
    @JoinColumn({ name: "launch_id" })
    launch: Launch;

    @Column()
    launch_id: number;

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