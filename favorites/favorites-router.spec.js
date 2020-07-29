const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

const testUser = {
  first_name: "Test",
  last_name: "Test",
  username: "test",
  password: "test",
};

afterEach(async () => {
  await db("users")
    .truncate()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe("server", () => {
  describe(".", () => {
    it("can run the test", () => {
      expect(true).toBeTruthy();
    });
  });
});

test("/GET /api/favorites/:id", async () => {
  await request(server).post("/api/users/register").send(testUser);
  const login = await request(server)
    .post("/api/users/login")
    .send({ username: testUser.username, password: testUser.password });

  const favoriteSongs = await request(server)
    .get("/api/favorites/1")
    .set("authorization", login.body.token);
  expect(favoriteSongs.body).toHaveLength(2);
  expect(favoriteSongs.body[0]).toHaveProperty("favorite_songs");
  expect(favoriteSongs.body[1].favorite_songs).toBe(2);
});

test("/POST /api/favorites/:id/add/:favorite_songs", async () => {
  await request(server).post("/api/users/register").send(testUser);
  const login = await request(server)
    .post("/api/users/login")
    .send({ username: testUser.username, password: testUser.password });

  const addFavorite = await request(server)
    .post("/api/favorites/2/add/6969")
    .set("authorization", login.body.token);
  expect(addFavorite.body).toHaveProperty("favorite_songs");
  expect(addFavorite.body.favorite_songs).toBe(6969);
});

test("/DELETE /api/favorites/:id/remove/:favorite_id", async () => {
  await request(server).post("/api/users/register").send(testUser);
  const login = await request(server)
    .post("/api/users/login")
    .send({ username: testUser.username, password: testUser.password });

  const delFavorite = await request(server)
    .del("/api/favorites/1/remove/2")
    .set("authorization", login.body.token);
  expect(delFavorite.body).toHaveProperty("message");
  expect(delFavorite.status).toBe(200);
});
