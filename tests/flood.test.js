const nodemailer = require("nodemailer");
const faker = require("faker");

async function main() {
  const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 2525,
    auth: {
      user: "Test Mailbox 2",
      pass: " ",
    },
  });

  for (let i = 0; i < 100; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await transporter.sendMail({
      from: faker.internet.email(),
      to: faker.internet.email(),
      cc: faker.internet.email(),
      bcc: faker.internet.email(),
      replyTo: faker.internet.email(),
      subject: `Email Subject ${i}`,
      text: faker.lorem.sentence(),
      html: "<b>Hello world?</b>",
    });
  }
}

main().catch((error) => console.error(error));
