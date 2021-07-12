import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLaunches1625943090573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "dx_launches",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "date",
                        type: "timestamp"
                    },
                    {
                        name: "category_id",
                        type: "int"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "value",
                        type: "decimal",
                        precision: 8,
                        scale: 2
                    },
                    {
                        name: "status",
                        type: "int"
                    },
                    {
                        name: "user_id",
                        type: "string"
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
                        name:"FKLaunchUser",
                        referencedTableName: "dx_users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE"
                    },
                    {
                        name:"FKLaunchCategory",
                        referencedTableName: "dx_categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE"
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("dx_launches");
    }

}
