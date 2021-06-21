import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1624207004698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "dx_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "full_name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "created_on",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "updated_on",
                        type: "timestamp",
                        isNullable: true
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
