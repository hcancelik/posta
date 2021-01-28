import knex from "knex";
import knexfile from "../../knexfile";

export default {
  data() {
    return {
      db: null,
    };
  },
  created() {
    const dbConfig = knexfile[process.env.NODE_ENV];

    this.db = knex(dbConfig);
  },
};
