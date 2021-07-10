import request from "supertest";
import { app } from "../../app";

import { newCategory, newUser } from "../testData";

export const category = () => {
    let token;
    //#region alternative
    // beforeAll((done) => {
    //     request(app).post('/login/')
    //         .send({
    //             "email": newUser.email,
    //             "password": newUser.password
    //         }).end((err, response) => {
    //             token = response.body.token;
    //             done();
    //         });
    // })
    //#endregion
    beforeAll(async () => {
        const response = await request(app).post('/login/')
            .send({
                "email": newUser.email,
                "password": newUser.password
            });

        token = response.body.token;
    })

    it("Should be able to create a new category", async () => {
        const response = await request(app).post('/categories/')
            .set('Authorization', token)
            .send({
                category: newCategory
            });
        expect(response.status).toBe(201);
        expect(response.body.category.id).toBeTruthy()
    });

    it("Should not be able to create a new category with exists name", async () => {
        const response = await request(app).post('/categories/')
            .set('Authorization', token)
            .send({
                category: newCategory
            });
        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    });
}
