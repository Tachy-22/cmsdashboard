import React from 'react'
import ProductsTable from '../ProductsTable'
import AddProductsModal from '../AddProductsModal'

function Products() {
    return (
        <div>
          <AddProductsModal/>
          <br/>
          <ProductsTable/>
        </div>
    )
}

export default Products
