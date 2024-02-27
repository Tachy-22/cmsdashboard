import React from "react";
import ProductsTable from "../ProductsTable";
import AddProductsModal from "../AddProductsModal";

function ProductsForm() {
  return (
    <div>
      <AddProductsModal />
      <br />
      <ProductsTable />
    </div>
  );
}

export default ProductsForm;
