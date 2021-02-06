const nodemailer = require("nodemailer");

async function main() {
  const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 2525,
    auth: {
      user: "Test Mailbox 4",
      pass: " ",
    },
  });

  await transporter.sendMail({
    from: "foo@example.com",
    to: "Can Test<bar@example.com>, baz@example.com",
    cc: "celik@me.com",
    bcc: "abc@test.com",
    replyTo: "reply@to.com",
    subject: "Hello ✔",
    // text: "Hello world?",
    html: "<b>Hello world?</b>",
  });
}

main().catch((error) => console.error(error));
