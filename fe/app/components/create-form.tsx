"use client";

import { Formik, Form, Field } from "formik";
import {
  Input,
  Button,
  CheckboxGroup,
  Checkbox,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { validationSchema } from "@/app/utils/validation";
import { FormValues } from "@/app/utils/validation";

type Props = {
  fetchData: () => Promise<void>;
};

export function CreateDataForm({ fetchData }: Props) {
  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const response = await fetch("http://localhost:3000/api/data/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.status}`);
      }

      fetchData();
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center w-full">
        A Simple Data Form
      </h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          age: 1,
          favoriteColor: "red",
          interests: [],
          comments: "",
        }}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, setFieldValue, values }) => (
          <Form className="mt-8 w-full max-w-md mx-auto space-y-4">
            <Field name="name">
              {({ field }: { field: any }) => (
                <Input
                  {...field}
                  type="text"
                  label="Name"
                  placeholder="Enter your name"
                  className="mb-4"
                  errorMessage={touched.name && errors.name}
                />
              )}
            </Field>
            <Field name="email">
              {({ field }: { field: any }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  className="mb-4"
                  errorMessage={touched.email && errors.email}
                />
              )}
            </Field>
            <Field name="age">
              {({ field }: { field: any }) => (
                <Input
                  {...field}
                  type="number"
                  label="Age"
                  className="mb-4"
                  errorMessage={touched.age && errors.age}
                />
              )}
            </Field>
            <Field name="favoriteColor">
              {({ field }: { field: any }) => (
                <Select
                  {...field}
                  label="Favorite Color"
                  className="mb-4"
                  errorMessage={touched.favoriteColor && errors.favoriteColor}
                >
                  <SelectItem key="red" value="red">
                    Red
                  </SelectItem>
                  <SelectItem key="blue" value="blue">
                    Blue
                  </SelectItem>
                  <SelectItem key="green" value="green">
                    Green
                  </SelectItem>
                  <SelectItem key="yellow" value="yellow">
                    Yellow
                  </SelectItem>
                </Select>
              )}
            </Field>
            <Field name="interests">
              {() => (
                <CheckboxGroup
                  label="Interests"
                  value={values.interests}
                  onValueChange={(value) => setFieldValue("interests", value)}
                >
                  <Checkbox value="reading">Reading</Checkbox>
                  <Checkbox value="hiking">Hiking</Checkbox>
                  <Checkbox value="coding">Coding</Checkbox>
                </CheckboxGroup>
              )}
            </Field>
            <Field name="comments">
              {({ field }: { field: any }) => (
                <Textarea
                  {...field}
                  label="Comments"
                  className="mb-4"
                  errorMessage={touched.comments && errors.comments}
                />
              )}
            </Field>
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
