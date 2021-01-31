const tableName = "mailboxes";

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table.bigInteger("name").unique().index();
    table.timestamp("created_at", { useTz: true }).index();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
