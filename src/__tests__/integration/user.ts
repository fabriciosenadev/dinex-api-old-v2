import request from "supertest";
import { app } from "../../app";

import { newUser } from "../testData";

export const user = () => {
    it("Should be able to create a new user", async () => {
        const response = await request(app).post('/users/')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.user.id).toBeTruthy();
    });

    it("Should not be able to create a new user with exists email", async () => {
        const response = await request(app).post('/users/')
            .send(newUser);

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    });
}