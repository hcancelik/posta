const tableName = "mailboxes";

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table.bigInteger("name");
    table.timestamp("created_at").defaultTo(knex.fn.now()).index();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
