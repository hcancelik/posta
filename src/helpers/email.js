export default {
  saveEmail: async (db, mailbox, email, raw) => {
    await db("mailboxes")
      .insert({ name: mailbox, created_at: new Date().toISOString() })
      .onConflict("name")
      .ignore();

    const mailboxId = await db("mailboxes")
      .select("id")
      .where("name", mailbox)
      .then((res) => res[0].id);

    const from = email.from ? email.from.text : null;
    const to = email.to ? email.to.text : null;
    const cc = email.cc ? email.cc.text : null;
    const bcc = email.bcc ? email.bcc.text : null;
    const replyTo = email.replyTo ? email.replyTo.text : null;
    const {
      subject,
      html,
      text,
      messageId,
      headerLines: headers,
      attachments,
    } = email;

    const record = await db("emails").insert({
      mailbox_id: mailboxId,
      from,
      to,
      cc,
      bcc,
      reply_to: replyTo,
      subject,
      html,
      text,
      message_id: messageId,
      headers: JSON.stringify(headers),
      raw: JSON.stringify(raw),
      read: false,
      created_at: new Date().toISOString(),
    });

    if (attachments && attachments.length > 0) {
      const attachmentPromises = [];

      for (let i = 0; i < attachments.length; i += 1) {
        const attachment = attachments[i];

        attachmentPromises.push(
          db("attachments").insert({
            email_id: record,
            filename: attachment.filename,
            size: attachment.size,
            content_type: attachment.contentType,
            content: attachment.content,
            created_at: new Date().toISOString(),
          })
        );
      }

      await Promise.all(attachmentPromises);
    }

    return {
      id: record,
      mailboxId,
      subject,
    };
  },
};
