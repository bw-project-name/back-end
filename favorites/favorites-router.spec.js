const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

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
