import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePayMethodsLaunches1626033526905 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "dx_pay_methods_launches",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "pay_method",
                        type: "int"
                    },
                    {
                        name: "launch_id",
                        type: "int"
                    },
                    {
                        name: "created_on",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_on",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "deleted_on",
                        type: "timestamp",
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name:"FKPayMethodLaunch",
                        referencedTableName: "dx_launches",
                        referencedColumnNames: ["id"],
                        columnNames: ["launch_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE"
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("dx_pay_methods_launches");
    }

}
