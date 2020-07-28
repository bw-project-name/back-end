exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("favorites").insert([
        { favorite_songs: 1, user_id: 1 },
        { favorite_songs: 2, user_id: 1 },
        { favorite_songs: 2, user_id: 2 },
      ]);
    });
};
