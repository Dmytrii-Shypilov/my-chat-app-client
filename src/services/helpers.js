export const getDialoginfo = (dialog, colocutorId) => {
  if (dialog.messages.length) {
    const messages = dialog.messages.toReversed();

    const lastMessageText =
      messages[0].from === colocutorId
        ? messages[0].messageContent.at(-1).message
        : `You: ${messages[0].messageContent.at(-1).message}`;
    let unread = 0;
    const lastMessageTime = new Date(
      Number(messages[0].messageContent.at(-1).time)
    )
      .toTimeString()
      .split(" ")[0]
      .slice(0, 5);

    for (let i = 0; i < messages.length; i++) {
      const unreadList =
        messages[i].from === colocutorId
          ? messages[i].messageContent.filter((el) => el.isRead === false)
          : [];

      if (unreadList.length) {
        unread += unreadList.length;
      } else {
        break;
      }
    }

    return { unread, lastMessageTime, lastMessageText };
  }

  return { unread: 0, lastMessageTime: null, lastMessageText: null };
};
