import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "src/store/api/productApi";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../store/features/filterSlice";

function ProductFilter() {
    // useState hook 
    const [category, setCategory] = useState("All");
    const [brand, setBrand] = useState("All")
    const [price, setPrice] = useState(15);
    // useDispatch hook
    const dispatch = useDispatch();

    //fetch All products
    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            await dispatch(getAllProducts()) ;
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [dispatch])
    
    const products = useSelector((state)=> state.product.products)

    // filter by category
    const allCategories = [
        "All",
        ...new Set(products.map((product) => product.category)),
      ];
    
      
    const filterProducts = (cat) => {
        setCategory(cat);
        dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
    };

    // filter by brand
    const allBrands = [
        'All',
        ...new Set(products.map((product)=> product.brand))
    ]

    useEffect(() => {
      dispatch(FILTER_BY_BRAND({products, brand}))
    }, [dispatch, products, brand])
    
    // Filter by Price
    useEffect(() => {
        dispatch(FILTER_BY_PRICE({ products, price }));
      }, [dispatch, products, price]);

    // clear All Filters
    const clearFilters =  () => {
        filterProducts('All')
        setBrand("All");
        setPrice(1000);
      };

  return (
    <div>
        <h4>Categories</h4>
        <div className="ps-2">
            {allCategories.map((cat, index) => {
            return (
                <>
                   <div  key={index}>
                    <input
                        type="checkbox"
                        id={cat}
                        name={cat}
                        onClick={() => filterProducts(cat)}
                        className='me-2'
                        />
                        <label>
                            {cat}
                        </label>
                   </div>
                </>
               
            );
            })}
        </div>
        <hr className="border-top-3" />
        <h4>Brand</h4>
        <div className="ps-2">
            {allBrands.map((selectedBrand, index) => {
                return(
                    <>
                        <div  key={index}>
                            <input
                                type="checkbox"
                                id={brand}
                                name={brand}
                                onClick={()=> setBrand(selectedBrand)}
                                className='me-2'
                            />
                            <label htmlFor={brand}>
                                {brand}
                            </label>
                        </div>
                        
                    </>   
                )})
            } 
        </div>
        <hr className="border-top-3" />
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div >
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            max={1000}
          />
        </div>
        <hr />
        <div className="text-center d-grid gap-2 ">
            <button type="button" className="btn btn-danger" onClick={clearFilters}>
                Clear Filter
            </button>
        </div> 
        </div>
  )
}

export default ProductFilter