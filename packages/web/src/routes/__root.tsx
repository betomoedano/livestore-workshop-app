import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 flex items-center gap-4 bg-white shadow-sm">
        <span className="font-bold text-lg">Local-First Conf 2025!</span>
        <div className="flex gap-4">
          <Link to="/" className="[&.active]:font-bold hover:underline">
            Home
          </Link>
          <Link
            to="/notes/expo-club"
            className="[&.active]:font-bold hover:underline"
          >
            Expo Club
          </Link>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
