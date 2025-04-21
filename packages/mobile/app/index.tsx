import React from "react";
import { Meta } from "../components/Meta";
import { NewTodo } from "../components/NewTodo";
import { Filters } from "../components/Filters";
import { ListTodos } from "../components/ListTodos";
import { ListNotes } from "../components/ListNotes";

export default function Index() {
  return (
    <>
      <NewTodo />
      <Meta />
      <ListNotes />
      <Filters />
    </>
  );
}
