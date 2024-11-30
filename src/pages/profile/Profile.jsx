import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Input } from "@chakra-ui/react";

// http
import { httpClient } from "../../utils/httpClient";

// actions
import { userActions } from "../../redux/user/userSlice";

export function Profile() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function submitHandler(event) {
    try {
      setLoading(true);
      event.preventDefault();
      const arrayofValues = [...new FormData(event.target).entries()];
      const formData = {};
      arrayofValues.forEach(([key, value]) => {
        formData[key] = value;
      });
      const res = await httpClient.patch("/user", formData);
      dispatch(userActions.addUser(res.data.user));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <Box>
      <form onSubmit={submitHandler}>
        <label>
          Name
          <Input name="name" defaultValue={user.name} />
        </label>
        <label>
          Email
          <Input name="email" disabled defaultValue={user.email} />
        </label>
        <label>
          DOB
          <Input name="dob" type="date" defaultValue={user.dob} />
        </label>

        <Box mt={10}>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
