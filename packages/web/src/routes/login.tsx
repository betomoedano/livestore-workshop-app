import { useContext, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { AuthContext } from "../context/auth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.user) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate({ from: "/login" });
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn(name);
    navigate({ to: "/" });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg  w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Local-First Conf 2025!
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
