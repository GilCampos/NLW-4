import request from 'supertest';
import { app } from "../app";
import createConnection from '../database';

describe("Surveys", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/surveys").send({
          title: "Title Exemplo",
          description: "Descriptions Exemplo",
        });
      
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
       });      
});