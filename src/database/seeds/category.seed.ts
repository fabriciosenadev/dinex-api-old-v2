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
                    name: "Salário",
                    applicable: Applicable.In,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    name: "Alimentação",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    name: "Beleza",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    name: "Educação",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    name: "Lazer",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    name: "Saúde",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
                {
                    name: "Transporte",
                    applicable: Applicable.Out,
                    is_custom: IsCustom.No,
                    created_on: new Date().toISOString()
                },
            ])
            .execute()
    }
}