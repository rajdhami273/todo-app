import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

// Components
import { Box, Button, Text } from "@chakra-ui/react";
import { Input, ErrorMessageField } from "../../components/input/Input";

// http
import { httpClient } from "../../utils/httpClient";

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  dob: yup.date().required("DOB is required"),
});

export function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function register(values) {
    try {
      setLoading(true);
      await httpClient.post("/auth/register", values);
      setLoading(false);
      setError("");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || error?.message);
      setLoading(false);
    }
  }
  return (
    <Box p={"10"}>
      <Formik
        initialValues={{ name: "", email: "", password: "", dob: "" }}
        validationSchema={registerSchema}
        onSubmit={register}
      >
        {() => (
          <Form>
            <label htmlFor="name">Name</label>
            <Field type="name" name="name" as={Input} />
            <ErrorMessage name="name" component={ErrorMessageField} />
            {/*  */}
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" as={Input} />
            <ErrorMessage name="email" component={ErrorMessageField} />
            {/*  */}
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" as={Input} />
            <ErrorMessage name="password" component={ErrorMessageField} />
            {/*  */}
            <label htmlFor="dob">DOB</label>
            <Field type="date" name="dob" as={Input} />
            <ErrorMessage name="dob" component={ErrorMessageField} />
            {/*  */}
            <Box my={5}>
              {error ? <Text color="red.400">{error}</Text> : null}
            </Box>
            <Button type="submit" disabled={loading}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
