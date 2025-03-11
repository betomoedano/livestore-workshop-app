import { makeDurableObject, makeWorker } from "@livestore/sync-cf/cf-worker";

// how can I count the number of todos a user has? so that I can trigger a push notification when the hit the limit?
export class WebSocketServer extends makeDurableObject({
  onPush: async (message) => {
    console.log("onPush", message.batch);
  },
  onPull: async (message) => {
    console.log("onPull", message);
  },
}) {}

export default makeWorker();
