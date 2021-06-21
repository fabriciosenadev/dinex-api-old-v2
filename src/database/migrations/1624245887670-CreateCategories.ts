import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { Applicable } from "../../models/enums/Applicable";

export class CreateCategories1624245887670 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "dx_categories",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "category",
                        type: "varchar"
                    },
                    {
                        name:"applicable",
                        type: "int"
                    },
                    {
                        name: "is_custom",
                        type: "int"
                    },
                    {
                        name: "created_on",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
