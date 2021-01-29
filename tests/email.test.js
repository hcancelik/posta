const nodemailer = require("nodemailer");

async function main() {
  const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 2525,
    auth: {
      user: "Test Email",
      pass: " ",
    },
  });

  await transporter.sendMail({
    from: "foo@example.com",
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });
}

main().catch((error) => console.error(error));
