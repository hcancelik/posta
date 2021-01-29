const tableName = "mailboxes";

exports.seed = (knex) => {
  return knex(tableName)
    .del()
    .then(() => {
      const emails = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= 5; i++) {
        emails.push({
          name: `Text Mailbox ${i}`,
        });
      }

      return knex(tableName).insert(emails);
    });
};
