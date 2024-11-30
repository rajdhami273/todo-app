import { Box, Stack, Text } from "@chakra-ui/react";

export function TodoItem({ todo, handleCompleteToggle }) {
  return (
    <Box shadow={"sm"} p={"2"} borderRadius={4}>
      <Stack direction="row" justifyContent={"space-between"}>
        <Text textDecoration={todo.completed && "line-through"}>
          {todo.title}
        </Text>
        <input
          type="checkbox"
          onClick={() => handleCompleteToggle(todo._id, !todo.completed)}
          checked={todo.completed}
        />
      </Stack>
    </Box>
  );
}
