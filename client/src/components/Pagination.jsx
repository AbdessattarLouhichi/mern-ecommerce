import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({items, itemsPerPage }) {
  console.log(items)
  console.log(itemsPerPage)
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset)) ;
    setPageCount( Math.ceil(items.length / itemsPerPage));
   
  }, [itemOffset,itemsPerPage, items])
  

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div>
        {currentItems.map((item,index)=>{
              return <div key={index} >{item}</div>
        })
        }
      </div>
      <ReactPaginate
        className='d-flex justify-content-between '
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default Pagination;