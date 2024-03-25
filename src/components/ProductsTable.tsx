"use client";
import React, { useCallback, useState } from "react";
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
  Spinner,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import { Product } from "@prisma/client";
import { useAppSelector } from "@/lib/redux/hooks";
import { deleteProduct } from "@/actions/product/deleteProduct";
import { useToast } from "./ui/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import DeleteButton from "./forms/DeleteButton";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function ProductsTable() {
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
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

  const handleProductDeletion = useCallback(
    async (id: string, url: string) => {
      try {
        const success = await deleteProduct(id);
        if (success) {
          const result = await edgestore.publicFiles.delete({
            url: url,
          });
        } else {
        }

        toast({ description: "Product has been deleted !" });
      } catch (error) {

        toast({ description: `Product has not been deleted: ${error}` });
      }
    },
    [edgestore.publicFiles, toast]
  );
  ;

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
            <div className="relative flex items-center gap-[0.5rem]">
              <Tooltip color="danger" content="Delete product">
                <form
                  action={async () => {
                    await handleProductDeletion(
                      product?.id,
                      product?.images[0] as string
                    );
                  }}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteButton color="danger" variant="faded" className="border-0">
                    <Trash />
                  </DeleteButton>
                </form>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleProductDeletion]
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
