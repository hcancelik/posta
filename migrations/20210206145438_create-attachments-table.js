const tableName = "attachments";

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table
      .bigInteger("email_id")
      .index()
      .references("id")
      .inTable("emails")
      .notNullable()
      .onDelete("cascade");
    table.string("filename").nullable();
    table.string("content_type").nullable();
    table.string("size").nullable();
    table.text("content").nullable();
    table.timestamp("created_at", { useTz: true }).index();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
