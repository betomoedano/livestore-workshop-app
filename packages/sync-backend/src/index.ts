import { makeDurableObject, makeWorker } from "@livestore/sync-cf/cf-worker";
import * as jose from "jose";

const JWT_SECRET = "a-string-secret-at-least-256-bits-long";

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

    const user = await getUserFromToken(authToken);
    console.log("Sync backend payload", JSON.stringify(user, null, 2));

    if (payload.exp && payload.exp < Date.now() / 1000) {
      console.log("Token expired");
      throw new Error("Token expired");
    }
    console.log(authToken);
  },
  enableCORS: true,
});

async function getUserFromToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return payload;
  } catch (error) {
    console.log("⚠️ Error verifying token", error);
  }
}
