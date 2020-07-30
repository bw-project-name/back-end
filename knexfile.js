const pgConnection =
  process.env.DATABASE_URL || "postgresql://postgres@localhost/users";

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./users.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
