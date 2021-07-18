import request from "supertest";
import { app } from "../../app";

import { newCategory, newUser as user } from "../testData";

export const category = () => {
    let token;
    let categoryId;
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
                "email": user.email,
                "password": user.password
            });

        token = response.body.token;
    })

    it("Should be able to create a new category", async () => {
        const response = await request(app).post('/categories/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                category: newCategory
            });
        expect(response.status).toBe(201);
        expect(response.body.category.id).toBeTruthy();
        categoryId = response.body.category.id;
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

    it("Should be able to delete a category", async () => {
        const response = await request(app).delete(`/categories/${categoryId}`)
            .set('Authorization', token).send();

        expect(response.status).toBe(200);
    });

    it("Should not be able to delete same category", async () => {
        const response = await request(app).delete(`/categories/${categoryId}`)
            .set('Authorization', token).send()

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    });
}
