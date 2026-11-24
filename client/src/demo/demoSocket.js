import { botReply, DEMO_ACCOUNT } from "./demoBackend";

// Minimal stand-in for a socket.io client. Keeps one handler per event.
export const createDemoSocket = () => {
  const handlers = {};
  const fire = (event, payload) => handlers[event] && handlers[event](payload);

  return {
    on(event, fn) {
      handlers[event] = fn;
    },
    off(event) {
      delete handlers[event];
    },
    emit(event, payload) {
      if (event === "addUsers") {
        setTimeout(
          () =>
            fire("getUsers", [
              { ...DEMO_ACCOUNT },
              { sub: "bot-ava" },
              { sub: "bot-ben" },
              { sub: "bot-chloe" },
            ]),
          0
        );
      } else if (event === "sendMessage") {
        const reply = botReply(payload);
        if (reply) {
          setTimeout(() => {
            const msg = reply.make();
            fire("getMessage", msg);
          }, 900);
        }
      }
    },
    disconnect() {},
  };
};
