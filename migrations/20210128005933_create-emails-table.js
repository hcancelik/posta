const tableName = "emails";

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table
      .bigInteger("mailbox_id")
      .index()
      .references("id")
      .inTable("mailboxes")
      .notNullable()
      .onDelete("cascade");
    table.string("from");
    table.string("to");
    table.string("cc").nullable();
    table.string("bcc").nullable();
    table.string("reply_to").nullable();
    table.text("html").nullable();
    table.text("text").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).index();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
};
