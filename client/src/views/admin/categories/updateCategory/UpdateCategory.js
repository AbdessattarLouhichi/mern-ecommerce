import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCategory, updateCategory } from 'src/store/api/categoryApi';
import { useNavigate, useParams} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

function UpdateCategory() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const [data, setData] = useState({
    name : '',
    description: ''
  })
  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(getCategory(id))
      console.log(response)
      return setData(response.payload.data)
    }
    fetchData()
  }, [id, dispatch])
 
 
// handleChange 
  const handleChange = async (e )=>{   
    await  setData({...data,
        [e.target.id] : e.target.value,
      }) 
  }
  
//dispatch updateCategory
const updateData =  async (e) =>{
  e.preventDefault()
   await dispatch(updateCategory({id: id, data: data}))
   .then((response) =>{ 
    toast.success(response.payload.message, {
      position: "top-center",
    })
    setTimeout(()=>{
      navigate ('/admin/viewCategories')
    },3000)
  })
  .catch((error)=>{
    toast.error(error.message , {
      position: "top-center",
    })
  }) 

}
 
  return (
    <div>
      <div className="container justify-content-center pt-5 ">
      <ToastContainer />
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
            <form onSubmit={updateData} >
              {/* Product Name input type text*/}
              <div className="form-group">
                <label htmlFor="name" className="font-weight-bold">Category</label>
                <input type="text" className="form-control" id="name" value={data.name} onChange={handleChange} placeholder="name"/>
              </div>
              {/* Category Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="description" value={data.description} onChange={handleChange} rows="3"></textarea>
              </div>
             
              {/*Click button  to add category*/}
              <button  type="submit"  className="btn btn-dark   font-weight-bold">Update</button>
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default UpdateCategory