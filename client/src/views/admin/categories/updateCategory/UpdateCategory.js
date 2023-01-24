import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from 'src/store/api/categoryApi';
import { useParams} from 'react-router-dom'


function UpdateCategory() {
  const dispatch = useDispatch
  //const navigate = useNavigate()
  const {id} = useParams();
 

  
  //Fetch Data
  const categories = useSelector((state)=> state.category.categories)
  const targetCategory =  categories.filter((cat)=> cat._id === id)
  const [data, setData] = useState(targetCategory[0])
// handleChange 
  const handleChange = async (e )=>{   
    await  setData({...data,
        [e.target.id] : e.target.value,
      }) 
  }
  
//dispatch updateCategory
const updateData =  (e) =>{
  e.preventDefault()
  console.log(data)
  dispatch(updateCategory(id, data))
  navigate ('/admin/viewCategories')
}
 
  return (
    <div>
      <div className="container justify-content-center pt-5 "> 
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
            <form>
              {/* Product Name input type text*/}
              <div className="form-group">
                <label htmlFor="name" className="font-weight-bold">Category</label>
                <input type="text" className="form-control" id="name" value={data?.name} onChange={handleChange} placeholder="name"/>
              </div>
              {/* Category Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="description" value={data?.description} onChange={handleChange} rows="3"></textarea>
              </div>
             
              {/*Click button  to add category*/}
              <button  type="submit" onClick={updateData}  className="btn btn-dark   font-weight-bold">Update</button>
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default UpdateCategory