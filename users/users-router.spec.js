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
  await db("users").truncate();
});

describe("server", () => {
  describe(".", () => {
    it("can run the test", () => {
      expect(true).toBeTruthy();
    });
  });
});

test("POST /api/users/register to be successful", async () => {
  const register = await request(server)
    .post("/api/users/register")
    .send(testUser);
  expect(register.status).toBe(201);
  expect(register.body).toHaveLength(1);
  expect(register.body[0]).toHaveProperty("username");
});

test("POST /api/users/login to be successful", async () => {
  await request(server).post("/api/users/register").send(testUser);
  const login = await request(server)
    .post("/api/users/login")
    .send({ username: testUser.username, password: testUser.password });
  expect(login.status).toBe(200);
  expect(login.body.message).toMatch(/Welcome to our API/);
  expect(login.body).toHaveProperty("token");
});

test("/GET /api/users to be successful", async () => {
  await request(server).post("/api/users/register").send(testUser);
  const login = await request(server)
    .post("/api/users/login")
    .send({ username: testUser.username, password: testUser.password });
  const allUsers = await request(server)
    .get("/api/users")
    .set("authorization", login.body.token);
  expect(allUsers.body).toHaveLength(1);
  expect(allUsers.status).toBe(200);
});

test("/GET /api/users/:id to be successful", async () => {
  await request(server).post("/api/users/register").send(testUser);
  const login = await request(server)
    .post("/api/users/login")
    .send({ username: testUser.username, password: testUser.password });
  const user = await request(server)
    .get("/api/users/1")
    .set("authorization", login.body.token);
  expect(user.body).toHaveLength(1);
  expect(user.status).toBe(200);
  expect(user.body[0]).toHaveProperty("first_name");
  expect(user.body[0].first_name).toBe("Test");
});

test("/PUT /api/users/:id to be successful", async () => {
  await request(server).post("/api/users/register").send(testUser);
  const login = await request(server)
    .post("/api/users/login")
    .send({ username: testUser.username, password: testUser.password });
  const update = await request(server)
    .put("/api/users/1")
    .send({
      first_name: "Edited",
      last_name: "Edited",
      username: "edited",
      password: "edited",
    })
    .set("authorization", login.body.token);
  expect(update.body).toHaveLength(1);
  expect(update.status).toBe(200);
  expect(update.body[0]).toHaveProperty("first_name");
  expect(update.body[0].first_name).toBe("Edited");
});

// test("/DELETE /api/users/:id to be successful", async () => {
//   const delUser = await request(server).delete("/api/users/2");
//   expect(delUser.status).toBe(200);
//   expect(delUser.body).toHaveProperty("message");
//   expect(delUser.body.message).toMatch(/The user was successfully deleted!/);
//   // console.log(delUser.body)
// });

// test("/GET /api/comments/:id/favorites", async () => {
//   const favoriteComments = await request(server).get(
//     "/api/comments/1/favorites"
//   );
//   expect(favoriteComments.body).toHaveLength(2);
//   expect(favoriteComments.body[0]).toHaveProperty("favorite_comments");
//   expect(favoriteComments.body[1].favorite_comments).toBe(2);
//   // console.log(favoriteComments.body)
// });

// test("/POST /api/comments/:id/add/:favorite_comments", async () => {
//   const addComment = await request(server).post("/api/comments/2/add/23409875");
//   expect(addComment.body).toHaveProperty("favorite_comments");
//   expect(addComment.body.favorite_comments).toBe(23409875);
//   // console.log(addComment.body.favorite_comments)
// });

// test("/DELETE /api/comments/:id/remove/:comment_id", async () => {
//   const delComment = await request(server).del("/api/comments/1/remove/2");
//   expect(delComment.body).toHaveProperty("message");
//   expect(delComment.status).toBe(200);
//   // console.log(delComment.body)
// });
