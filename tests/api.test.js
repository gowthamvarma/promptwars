import request from "supertest";
import { app } from "../src/server.js";

describe("Travel Planner API", () => {
  it("should render the home page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain("Your Next Adventure Awaits");
  });

  it("should render the chat page", async () => {
    const res = await request(app).get("/chat");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain("Travel Agent");
  });

  it("should reset the session", async () => {
    const res = await request(app).get("/reset");
    expect(res.statusCode).toEqual(302);
    expect(res.header.location).toBe("/");
  });
});
