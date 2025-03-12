import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { makeAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import LiveStoreWorker from "./livestore.worker.ts?worker";
import { LiveStoreProvider } from "@livestore/react";
import { schema } from "@workshop/shared/schema.ts";
import { unstable_batchedUpdates } from "react-dom";
import { getStoreId } from "../util/store-id.ts";

const adapter = makeAdapter({
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
    >
      <App />
    </LiveStoreProvider>
  </StrictMode>
);
