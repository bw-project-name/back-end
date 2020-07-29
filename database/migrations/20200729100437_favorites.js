exports.up = function (knex) {
  return knex.schema
    .createTable("favorites", (favorites) => {
      favorites.increments();

      favorites.integer("favorite_songs").notNullable();
      favorites
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE") // RESTRICT, DO NOTHING, SET NULL, CASCADE
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("favorites");
};
