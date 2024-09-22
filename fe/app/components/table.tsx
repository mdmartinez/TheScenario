import React from "react";
import {
  Table as NextUITable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormValues } from "../utils/validation";

type TableProps = {
  data: FormValues[];
  onDelete: (id: string) => void;
  reset: () => void;
};

export const Table: React.FC<TableProps> = ({
  data,
  onDelete,
  reset,
}) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/data/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
      onDelete(id);
      reset();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <NextUITable aria-label="Data table">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>Favorite Color</TableColumn>
        <TableColumn>Interests</TableColumn>
        <TableColumn>Comments</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.favoriteColor}</TableCell>
            <TableCell>{item.interests.join(", ")}</TableCell>
            <TableCell>{item.comments}</TableCell>
            <TableCell>
              <Button
                color="primary"
                onClick={() => router.push(`/${item._id}/edit`)}
                className="mr-2"
              >
                Edit
              </Button>
              <Button color="danger" onClick={() => handleDelete(item._id!)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </NextUITable>
  );
};
