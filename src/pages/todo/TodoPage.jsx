import { Box, Stack } from "@chakra-ui/react";
import { Input } from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "../../redux/todos/todoSelectors";
import { TodoItem } from "./TodoItem";
import { useEffect, useState } from "react";
import { todoActions } from "../../redux/todos/todoSlice";
import { httpClient } from "../../utils/httpClient";

export function TodoPage() {
  const [todoTitle, setTodoTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  async function handleTodoSubmit(event) {
    setLoading(true);
    try {
      event.preventDefault();
      // Call an API to save the todo
      const res = await httpClient.post("/todo", { title: todoTitle });
      dispatch(todoActions.addTodo(res.data.todo));
      setTodoTitle("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCompleteToggle(todoId, newCompletedState) {
    setLoading(true);
    try {
      // Call an API to save the todo
      const res = await httpClient.put(`/todo/${todoId}`, {
        completed: newCompletedState,
      });
      dispatch(todoActions.updateTodo(res.data.todo));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async function () {
      try {
        const res = await httpClient.get("/todo/all");
        dispatch(todoActions.addAllTodos(res.data.todos));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <Box>
      <form onSubmit={handleTodoSubmit}>
        <Input
          value={todoTitle}
          disabled={loading}
          required
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </form>
      <Stack direction={"column"} py={5}>
        {todos.map((todo) => {
          return (
            <TodoItem
              handleCompleteToggle={handleCompleteToggle}
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
