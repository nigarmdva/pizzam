import React from 'react'
import Products from '../Components/Products'
import UserProfileNav from '../Components/UserProfileNav'

const ProductsPage = () => {
  return (
    <div className='flex flex-col'>
        <UserProfileNav/>
        <Products/>
    </div>
  )
}

export default ProductsPage