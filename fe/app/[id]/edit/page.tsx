"use client";

import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormValues, validationSchema } from "@/app/utils/validation";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function EditDataPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/data/${id}`);

      if (!response.ok) {
        throw new Error(`error fetching data: ${response.status}`);
      }

      const result: FormValues = await response.json();
      setData(result);
    } catch (e) {
      console.error("Fetch error:", e);
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/api/data/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.status}`);
      }

      resetForm();
      router.push("/");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Data</h1>
      <Formik
        initialValues={data}
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
    </div>
  );
}
