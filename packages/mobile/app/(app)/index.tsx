import React, { use } from "react";
import { Meta } from "../../components/Meta";
import { NewTodo } from "../../components/NewTodo";
import { Filters } from "../../components/Filters";
import { ListTodos } from "../../components/ListTodos";
import { AuthContext } from "../../context/Auth";

export default function Index() {
  const user = use(AuthContext)?.user;

  console.log("user", user);
  return (
    <>
      <NewTodo />
      <Meta />
      <ListTodos />
      <Filters />
    </>
  );
}
