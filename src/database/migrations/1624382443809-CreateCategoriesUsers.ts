import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoriesUsers1624382443809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "dx_categories_users",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "string"
                    },
                    {
                        name: "category_id",
                        type: "int"
                    },
                    {
                        name: "created_on",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "deleted_on",
                        type: "timestamp",
                        isNullable: true
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUser",
                        referencedTableName: "dx_users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE"
                    },
                    {
                        name:"FKCategory",
                        referencedTableName: "dx_categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE" 
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("dx_categories_users");
    }

}
