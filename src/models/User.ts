import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("dx_users")
export class User {
    //#region Props
    @PrimaryColumn()
    readonly id: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn({
        type: "datetime",
        nullable: true
    })
    updated_on: Date;
    //#endregion

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    //#region Encapsuling
    // public get fullName() {
    //     return this.full_name;
    // }
    // public set fullName(fullName: string) {
    //     this.full_name = fullName;
    // }

    // public get emailAddress() {
    //     return this.email;
    // }
    // public set emailAddress(emailAddress: string) {
    //     this.email = emailAddress;
    // }

    // public get pass() {
    //     return this.password;
    // }
    // public set pass(pass: string) {
    //     this.password = pass;
    // }

    // public get createdOn() {
    //     return this.created_on;
    // }
    // public set createdOn(createdOn: Date) {
    //     this.created_on = createdOn;
    // }
    
    // public get updatedOn() {
    //     return this.updated_on;
    // }
    // public set updatedOn(updatedOn: Date) {
    //     this.updated_on = updatedOn;
    // }
    //#endregion
}
