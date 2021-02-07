import { app, remote } from "electron";

const path =
  remote && remote.app
    ? remote.app.getPath("userData")
    : app.getPath("userData");

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: `${path}/dev.sqlite3`,
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: `${path}/posta.sqlite3`,
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
};
