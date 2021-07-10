import request from "supertest";
import { app } from "../../app";

import { newUser } from "../testData";

export const auth = () => {
    it("Should be able to login in with exists user", async () => {
        const response = await request(app).post('/login/')
            .send({
                "email": newUser.email,
                "password": newUser.password
            })
        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy()
    });

    it("Should not be able to login in with non exists user", async () => {
        const response = await request(app).post('/login/')
            .send({
                "email": "user2@example.com",
                "password": newUser.password
            })
        expect(response.status).toBe(401);
        expect(response.body.error).toBeTruthy();
    });
}