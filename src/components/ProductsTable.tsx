import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  User,
} from "@nextui-org/react";
import { Trash, EyeIcon, PenSquare } from "lucide-react";
import { Product } from "@prisma/client";
import { useAppSelector } from "@/lib/redux/hooks";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function ProductsTable() {
  const { project } = useAppSelector((state) => state.projectSlice);
  const products: Product[] = project?.product as Product[];

  const columns = [
    {
      uid: "name",
      name: "Name",
    },
    {
      uid: "type",
      name: "Type",
    },
    {
      uid: "description",
      name: "Description",
    },

    {
      uid: "price",
      name: "Price",
    },

    {
      uid: "actions",
      name: "Actions",
    },
  ];

  console.log({ products });

  const renderCell = React.useCallback(
    (product: Product, columnKey: string) => {
      const cellValue = (product as any)[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: product.images[0] }}
              description={product.description}
              name={cellValue}
            >
              {product.description}
            </User>
          );
        case "type":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">${cellValue}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={(statusColorMap as any)[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="danger" content="Delete product">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Trash />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="Products table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={products} emptyContent={"No projects found"}>
        {products?.map((product) => (
          <TableRow key={product.id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(product, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
