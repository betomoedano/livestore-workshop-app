import { makeWorker } from "@livestore/adapter-web/worker";
import { makeWsSync } from "@livestore/sync-cf";

import { schema } from "@workshop/shared/schema";

const url =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LIVESTORE_SYNC_URL_DEV
    : import.meta.env.VITE_LIVESTORE_SYNC_URL;

makeWorker({
  schema,
  sync: {
    makeBackend: ({ storeId }) => makeWsSync({ url, storeId }),
    // initialSyncOptions: { _tag: "Blocking", timeout: 5000 },
  },
});
