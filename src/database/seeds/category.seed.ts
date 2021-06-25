/**
 * how to run: yarn seed:run
 * base docs: https://www.npmjs.com/package/typeorm-seeding#-basic-seeder
 */

import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { v4 as uuid } from "uuid";
import { Category } from '../../models/Category'
import { Applicable } from "../../models/enums/Applicable";
import { IsCustom } from "../../models/enums/IsCustom"

export default class CreateCategories implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values([
                {
                    category: "Salário",
                    applicable: Applicable.In,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    category: "Alimentação",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    category: "Beleza",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    category: "Educação",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    category: "Lazer",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    category: "Saúde",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    category: "Transporte",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
            ])
            .execute()
    }
}