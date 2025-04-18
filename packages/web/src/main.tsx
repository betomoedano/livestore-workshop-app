import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import LiveStoreWorker from "./livestore.worker.ts?worker";
import { LiveStoreProvider } from "@livestore/react";
import { schema } from "@workshop/shared/schema.ts";
import { unstable_batchedUpdates } from "react-dom";
import { getStoreId } from "../util/store-id.ts";

const adapter = makePersistedAdapter({
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
  storage: { type: "opfs" },
});

const storeId = getStoreId();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LiveStoreProvider
      schema={schema}
      storeId={storeId}
      adapter={adapter}
      batchUpdates={unstable_batchedUpdates}
      renderLoading={({ stage }) => <div>Loading... {stage}</div>}
      renderShutdown={() => <div>Shutting down...</div>}
      syncPayload={{
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvIiwiaWF0IjoxNzEzMjQ5NjAwLCJleHAiOjE3MTMzMzYwMDB9.4Adcj3UFYcPpxga7Cp6AnuRwhk9xU3j3ZbXBp7fYH7E",
      }}
    >
      <App />
    </LiveStoreProvider>
  </StrictMode>
);
