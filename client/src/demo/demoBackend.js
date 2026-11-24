// In-browser stand-in for the Express + MongoDB API, used only in demo mode.
// Everything lives in memory and is lost on reload. The contacts are scripted bots.

const avatar = (letter, bg) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="${bg}"/><text x="50" y="66" font-size="48" font-family="Arial" text-anchor="middle" fill="#fff">${letter}</text></svg>`
  );

export const DEMO_ACCOUNT = {
  sub: "demo-visitor",
  name: "Demo Visitor",
  email: "visitor@demo.invalid",
  picture: avatar("D", "#32349C"),
};

const bots = [
  {
    _id: "bot-ava",
    sub: "bot-ava",
    name: "Ava (demo bot)",
    picture: avatar("A", "#e4572e"),
    about: "Scripted contact. Ask me about the stack.",
    greeting: "Hi, I am a scripted demo contact. Type a message or attach a file.",
  },
  {
    _id: "bot-ben",
    sub: "bot-ben",
    name: "Ben (demo bot)",
    picture: avatar("B", "#17a398"),
    about: "Scripted contact. I reply to a few keywords.",
    greeting: "Hello from Ben, another scripted contact. Try saying hello, or ask about files.",
  },
  {
    _id: "bot-chloe",
    sub: "bot-chloe",
    name: "Chloe (demo bot)",
    picture: avatar("C", "#76b041"),
    about: "Scripted contact.",
    greeting: "Hey, Chloe here. Nothing you type leaves your browser.",
  },
];

const rules = [
  [/\b(hi|hello|hey)\b/i, "Hello! This chat is running offline in your browser."],
  [/file|attach|image|pdf/i, "The real app stores shared files in MongoDB GridFS. In this demo they only live in your tab."],
  [/stack|tech|built|react|socket|mongo/i, "The full app uses React, Express, MongoDB and Socket.io. This demo replaces the server with scripted replies."],
  [/google|login|sign/i, "Google sign-in is disabled in the demo. The real app uses it to identify users."],
  [/\?\s*$/, "Good question. I am only a scripted bot, so I cannot say much more."],
];
const fallbacks = [
  "Got it. (scripted reply)",
  "Thanks for the message. (scripted reply)",
  "Message delivered in your browser only. (scripted reply)",
];

const users = [{ ...DEMO_ACCOUNT, _id: DEMO_ACCOUNT.sub }, ...bots];
const conversations = []; // { _id, members, message, updatedAt }
const messages = []; // { _id, conversationId, senderId, recieverId, type, text, createdAt }
const abouts = { [DEMO_ACCOUNT.sub]: "Browsing the offline demo." };
bots.forEach((b) => (abouts[b.sub] = b.about));

let counter = 0;
const nextId = (p) => `${p}-${Date.now()}-${counter++}`;
const findConv = (a, b) =>
  conversations.find((c) => c.members.includes(a) && c.members.includes(b));

const addMessage = (m) => {
  const msg = { _id: nextId("m"), createdAt: Date.now(), ...m };
  messages.push(msg);
  const conv = conversations.find((c) => c._id === m.conversationId);
  if (conv) {
    conv.message = m.text;
    conv.updatedAt = msg.createdAt;
  }
  return msg;
};

export const demoApi = {
  addUser: async () => {},
  getUser: async () => ({
    message: "User fetched successfully",
    user: users.map(({ greeting, about, ...u }) => u),
  }),
  setConversation: async ({ senderId, recievedId }) => {
    if (findConv(senderId, recievedId)) return;
    const conv = {
      _id: nextId("c"),
      members: [senderId, recievedId],
      message: "",
      updatedAt: Date.now(),
    };
    conversations.push(conv);
    const bot = bots.find((b) => b.sub === recievedId);
    if (bot) {
      addMessage({
        conversationId: conv._id,
        senderId: bot.sub,
        recieverId: senderId,
        type: "text",
        text: bot.greeting,
      });
    }
  },
  getConversation: async ({ senderId, recieverId }) => ({
    conversation: findConv(senderId, recieverId) || null,
  }),
  newMessage: async (data) => ({ message: "New message sent", newMessage: addMessage(data) }),
  getMessages: async (id) => messages.filter((m) => m.conversationId === id),
  uploadFile: async (formData) => {
    const file = formData.get("file");
    const url = `${URL.createObjectURL(file)}#-${encodeURIComponent(file.name)}`;
    return { data: url };
  },
  addAboutUser: async ({ sub, about }) => {
    abouts[sub] = about;
  },
  getAboutUser: async (sub) => [{ sub, about: abouts[sub] || "" }],
};

// Produces a scripted reply from a bot, or null if the receiver is not a bot.
export const botReply = (message) => {
  const bot = bots.find((b) => b.sub === message.recieverId);
  if (!bot) return null;
  const rule = rules.find(([re]) => re.test(message.text || ""));
  const text = rule ? rule[1] : fallbacks[counter++ % fallbacks.length];
  return {
    bot,
    make: () =>
      addMessage({
        conversationId: message.conversationId,
        senderId: bot.sub,
        recieverId: message.senderId,
        type: "text",
        text,
      }),
  };
};
