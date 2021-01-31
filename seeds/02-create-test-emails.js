const faker = require("faker");

const tableName = "emails";

exports.seed = (knex) => {
  return knex(tableName)
    .del()
    .then(() => {
      const emails = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 5; i <= 105; i++) {
        emails.push({
          mailbox_id: (i % 5) + 1,
          from: faker.internet.email(),
          to: faker.internet.email(),
          cc: faker.internet.email(),
          bcc: faker.internet.email(),
          reply_to: faker.internet.email(),
          subject: faker.lorem.sentence(),
          html: faker.lorem.paragraphs(10),
          text: faker.lorem.paragraphs(3),
          message_id: faker.random.uuid(),
          headers: JSON.stringify({ foo: "bar" }),
          raw: faker.lorem.paragraphs(5),
          read: false,
          created_at: new Date().toISOString(),
        });
      }

      return knex(tableName).insert(emails);
    });
};
