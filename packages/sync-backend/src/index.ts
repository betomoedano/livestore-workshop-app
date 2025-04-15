import { makeDurableObject, makeWorker } from "@livestore/sync-cf/cf-worker";
import * as jose from "jose";

const JWT_SECRET = "expo-secret";

// how can I count the number of todos a user has? so that I can trigger a push notification when the hit the limit?
export class WebSocketServer extends makeDurableObject({
  onPush: async (message) => {
    console.log("onPush", message.batch);
  },
  onPull: async (message) => {
    console.log("onPull", message);
  },
}) {}

export default makeWorker({
  validatePayload: async (payload: any) => {
    const { authToken } = payload;

    if (!authToken) {
      console.log("no auth token provided");
      throw new Error("No auth token provided");
    }

    try {
      // const { payload } = await jose.jwtVerify(
      //   authToken,
      //   new TextEncoder().encode(JWT_SECRET)
      // );
      // if (payload.exp && payload.exp < Date.now() / 1000) {
      //   throw new Error("Token expired");
      // }
      console.log(authToken);
    } catch (error) {
      throw new Error("Invalid auth token");
    }
  },
  enableCORS: true,
});
