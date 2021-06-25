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
                        type: "int"
                    },
                    {
                        name: "category_id",
                        type: "int"
                    },
                    {
                        name: "created_by",
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
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("dx_categories_users");
    }

}
