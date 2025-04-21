import React from "react";
import { Filters } from "../components/Filters";
import { ListTodos } from "../components/ListTodos";
import { ListNotes } from "../components/ListNotes";

export default function Index() {
  return (
    <>
      <ListNotes />
      <Filters />
    </>
  );
}
