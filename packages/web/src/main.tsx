import { StrictMode, use } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthContext, AuthProvider } from "./context/auth.tsx";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
function InnerApp() {
  const auth = use(AuthContext);
  return <RouterProvider router={router} context={{ auth }} />;
}
// const storeId = getStoreId();

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </StrictMode>
  );
}
