import { Input as Inp, Text } from "@chakra-ui/react";

export function Input(props) {
  return <Inp {...props} />;
}

export function ErrorMessageField(props) {
  return (
    <div>
      <Text {...props} color="red.400" />
    </div>
  );
}
