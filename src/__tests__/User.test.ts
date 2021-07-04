import request from "supertest";
import { getCustomRepository } from "typeorm";
import { app } from "../app";

import createConnection from "../database";
import { Applicable } from "../models/enums/Applicable";
import { IsCustom } from "../models/enums/IsCustom";
import { CategoryRepository } from "../repository/CategoryRepository";
import { Cryptography } from "../utils/Cryptography";

describe("Users", () => {
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

    // password fields are a encrypted version of '123456'
    const newUser = {
        "full_name": "User Example",
        "email": "user@example.com",
        "password": "U2FsdGVkX185UQ1hgyMGAbhVixwpcZyxJ79/jM+yD1M=",
        "verifyPass": "U2FsdGVkX189hEIbMbH4toFPs7qtu2BaTeTIG52Umz8="
    };

    //#region create new user test
    it("Should be able to create a new user", async () => {      
        const response = await request(app).post('/user/')
            .send(newUser);      

        expect(response.status).toBe(201);
        expect(response.body.user.id).toBeTruthy();
    });

    it("Should not be able to create a new user with exists email", async () => {
        const response = await request(app).post('/user/')
            .send(newUser);

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    });
    //#endregion

    //#region login test
    it("Should be able to login in with exists user", async () => {
        const response = await request(app).post('/user/login/')
            .send({
                "email": newUser.email,
                "password": newUser.password
            })
        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy()
    });

    it("Should not be able to login in with non exists user", async () => {
        const response = await request(app).post('/user/login/')
            .send({
                "email": "user2@example.com",
                "password": newUser.password
            })
        expect(response.status).toBe(401);
        expect(response.body.error).toBeTruthy();
    });
    //#endregion
});


