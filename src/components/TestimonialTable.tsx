import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { Testimonial } from "@prisma/client";
import { useAppSelector } from "@/lib/redux/hooks";

export default function TestimonialTable() {
  const { project } = useAppSelector((state) => state.projectSlice);
  const testimonials: Testimonial[] = project?.testimonial as Testimonial[];

  const columns = [
    {
      uid: "name",
      name: "Name",
    },
    {
      uid: "comment",
      name: "Comment",
    },
    {
      uid: "s/n",
      name: "S/N",
    },
  ];

  console.log({ testimonials });

  const renderCell = React.useCallback(
    (testimonial: Testimonial, columnKey: string) => {
      const cellValue = (testimonial as any)[columnKey];

      switch (columnKey) {
        case "s/n":
          return (
            <div className="flex gap-3 items-center">
              {" "}
              <span className="h-4 w-4 rounded-full bg-green-600" />{" "}
              <p className=""> {testimonial.id}</p>
            </div>
          );
        case "name":
          return (
            <div className="flex ">
              <User
                name={testimonial.name}
                description={testimonial.occupation}
                className="  "
              />
            </div>
          );
        case "comment":
          return (
            <div className="flex flex-col max-w-[30rem]">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );

        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="testimonials table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align="start"
            className=""
            maxWidth="20"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={testimonials}>
        {testimonials?.map((testimonial) => (
          <TableRow key={testimonial.id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(testimonial, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
