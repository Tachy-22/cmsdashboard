// Import necessary components from @nextui-org/react
"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@nextui-org/react";
import { Project } from "@prisma/client";
import { CopyIcon } from "lucide-react";
import Link from "next/link";
import { useToast } from "./ui/use-toast";

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const { toast } = useToast();
  const columns = [
    {
      uid: "title",
      name: "Title",
    },

    {
      uid: "id",
      name: "ID",
    },

    {
      uid: "createdAt",
      name: "CreatedAt",
    },
    {
      uid: "status",
      name: "Status",
    },

    {
      uid: "actions",
      name: "Actions",
    },
  ];
  const renderCell = React.useCallback(
    (project: Project, columnKey: string) => {
      const cellValue = (project as any)[columnKey];

      switch (columnKey) {
        case "title":
          return (
            <div className="flex gap-2 items-center">
              <div
                style={{ backgroundColor: `${project.theme}` }}
                className=" h-6 aspect-square rounded-full"
              />
              <span className="">{cellValue}</span>
            </div>
          );

        case "id":
          return (
            <div
              className="flex items-center group gap-3"
              style={{ cursor: "pointer" }}
            >
              {cellValue}
              <CopyIcon
                onClick={() => handleCopyToClipboard(cellValue)}
                className="group-hover:opacity-100
              opacity-0 transition-opacity duration-300"
              />
            </div>
          );

        case "status":
          return (
            <div className="">
              <Chip variant="faded" className="">
                pending
              </Chip>
            </div>
          );

        case "actions":
          return (
            <Button
              href={`/dashboard/project/${project.id}`}
              size="sm"
              variant="solid"
              color="primary"
              as={Link}
              onPress={() => {
                toast({ description: "Redirecting..." });
              }}
            >
              View
            </Button>
          );
        default:
          return cellValue;
      }
    },
    [toast]
  );

  // ... (remaining code remains the same)

  return (
    <Table
      aria-label="Projects table with custom cells, pagination, and sorting"
      isHeaderSticky
      // ... (remaining props remain the same)
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No projects found"} items={projects || []}>
        {(project) => (
          <TableRow key={project.id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(project, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const handleCopyToClipboard = (value: string) => {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = value;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
};
