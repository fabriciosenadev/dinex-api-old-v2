import request from "supertest";
import { app } from "../../app";

import { newLaunch, newPayMethod, newUser as user } from "../testData";

export const launch = () => {
    let token: string;
    let launchId: number;
    beforeAll(async () => {
        const response = await request(app).post('/login/')
            .send({
                "email": user.email,
                "password": user.password
            });

        token = response.body.token;
    })

    it("should create a new entrance launch", async () => {
        const response = await request(app).post('/launches/')
            .set("Authorization", `Bearer ${token}`)
            .send({ launch: newLaunch })

        expect(response.status).toBe(201);
        expect(response.body.launch.id).toBeTruthy();
        launchId = response.body.launch.id;
    })

    it("should not create a new entrance launch with invalid date", async () => {
        const response = await request(app).post('/launches/')
            .set("Authorization", `Bearer ${token}`)
            .send({
                launch: {
                    date: "",
                    category_id: newLaunch.category_id,
                    description: newLaunch.description,
                    value: newLaunch.value,
                    status: newLaunch.status
                }
            })

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    })

    it("should not create a new entrance launch with invalid category", async () => {
        const response = await request(app).post('/launches/')
            .set("Authorization", `Bearer ${token}`)
            .send({
                launch: {
                    date: newLaunch.date,
                    category_id: "",
                    description: newLaunch.description,
                    value: newLaunch.value,
                    status: newLaunch.status
                }
            })

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    })

    it("should not create a new entrance launch with invalid value", async () => {
        const response = await request(app).post('/launches/')
            .set("Authorization", `Bearer ${token}`)
            .send({
                launch: {
                    date: newLaunch.date,
                    category_id: newLaunch.category_id,
                    description: newLaunch.description,
                    value: "",
                    status: newLaunch.status
                }
            })

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    })

    it("should not create a new entrance launch with invalid status", async () => {
        const response = await request(app).post('/launches/')
            .set("Authorization", `Bearer ${token}`)
            .send({
                launch: {
                    date: newLaunch.date,
                    category_id: newLaunch.category_id,
                    description: newLaunch.description,
                    value: newLaunch.value,
                    status: ""
                }
            })

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    })

    it("should create a new exit launch", async () => {
        const response = await request(app).post('/launches/')
            .set("Authorization", `Bearer ${token}`)
            .send({
                launch: {
                    date: newLaunch.date, 
                    category_id: newLaunch.category_id, 
                    description: newLaunch.description, 
                    value: newLaunch.value, 
                    status: newLaunch.status
                },
                payMethodLaunch: {
                    pay_method: newPayMethod.pay_method,
                }
            })

        expect(response.status).toBe(201);
        expect(response.body.launch.id).toBeTruthy();
        expect(response.body.payMethodLaunch.id).toBeTruthy();
    })

    it("should not create a new exit launch with invalid pay method", async () => {
        const response = await request(app).post('/launches/')
            .set("Authorization", `Bearer ${token}`)
            .send({
                launch: {
                    date: "",
                    category_id: newLaunch.category_id,
                    description: newLaunch.description,
                    value: newLaunch.value,
                    status: newLaunch.status
                },
                payMethodLaunch: {
                    pay_method: "",
                }
            })

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
    })
}