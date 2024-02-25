import React from 'react'
import ProductsTable from '../ProductsTable'
import AddProductsModal from '../AddProductsModal'

function Products() {
  const getProductsModal =(images:string[])=>{
return images
  }
    return (
        <div>
          <AddProductsModal/>
          <br/>
          <ProductsTable/>
        </div>
    )
}

export default Products
