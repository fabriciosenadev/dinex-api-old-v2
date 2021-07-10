import { getCustomRepository } from "typeorm";
import createConnection from "../../database";
import { CategoryRepository } from "../../repository/CategoryRepository";
import { Applicable } from "../../models/enums/Applicable";
import { IsCustom } from "../../models/enums/IsCustom";

import { user } from "./user";
import { auth } from "./auth";
import { category } from "./category";

beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    //#region create standard category
    const categoryRepository = getCustomRepository(CategoryRepository);

    const salary = await categoryRepository.create({
        name: "Salário",
        applicable: Applicable.In,
        is_custom: IsCustom.No,
    })
    await categoryRepository.save(salary);

    const food = await categoryRepository.create({
        name: "Alimentação",
        applicable: Applicable.Out,
        is_custom: IsCustom.No,
    })
    await categoryRepository.save(food);

    const beauty = await categoryRepository.create({
        name: "Beleza",
        applicable: Applicable.Out,
        is_custom: IsCustom.No,
    })
    await categoryRepository.save(beauty);

    const education = await categoryRepository.create({
        name: "Educação",
        applicable: Applicable.Out,
        is_custom: IsCustom.No,
    })
    await categoryRepository.save(education);

    const laser = await categoryRepository.create({
        name: "Lazer",
        applicable: Applicable.Out,
        is_custom: IsCustom.No,
    })
    await categoryRepository.save(laser);

    const health = await categoryRepository.create({
        name: "Saúde",
        applicable: Applicable.Out,
        is_custom: IsCustom.No,
    })
    await categoryRepository.save(health);

    const transport = await categoryRepository.create({
        name: "Transporte",
        applicable: Applicable.Out,
        is_custom: IsCustom.No,
    })
    await categoryRepository.save(transport);
    //#endregion
})

describe("User", user);
describe("Authentication", auth);
describe("Category", category);