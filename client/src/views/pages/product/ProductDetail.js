import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemDetail from 'src/components/product/ItemDetail'
import { selectProduct } from 'src/store/api/productApi';


function ProductDetail() {
 
  const dispatch = useDispatch()
  const {id} = useParams();
    useEffect(()=>{
      // declare the data fetching function
      const fetchData = async () => {
          await dispatch(selectProduct(id)) ;
      }
      // call the function
      fetchData()
          // make sure to catch any error
          .catch(console.error);
    },[dispatch, id])
  

  const product = useSelector((state)=> state.selectedItem.product)

  return (
    <>
      <ItemDetail product={product} />
    </>
  )
}

export default ProductDetail