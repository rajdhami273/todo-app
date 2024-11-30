import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

// Components
import { Box, Button, Text } from "@chakra-ui/react";
import { Input, ErrorMessageField } from "../../components/input/Input";

// http
import { httpClient } from "../../utils/httpClient";

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function login(values) {
    try {
      setLoading(true);
      await httpClient.post("/auth/login", values);
      setLoading(false);
      setError("");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || error?.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Box p={10}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={login}
      >
        {() => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" as={Input} />
            <ErrorMessage name="email" component={ErrorMessageField} />
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" as={Input} />
            <ErrorMessage name="password" component={ErrorMessageField} />
            <Box my={5}>
              {error ? <Text color="red.400">{error}</Text> : null}
            </Box>
            <Button type="submit" disabled={loading}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
