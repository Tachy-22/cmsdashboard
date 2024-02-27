import React from "react";
import ProductsTable from "../ProductsTable";
import AddProductsModal from "../AddProductsModal";
import { Product } from "@prisma/client";

function Products() {
  
  return (
    <div>
      <AddProductsModal />
      <br />
      <ProductsTable  />
    </div>
  );
}

export default Products;
