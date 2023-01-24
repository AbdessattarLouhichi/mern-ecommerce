import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { createCategory } from 'src/store/api/categoryApi';
//import {useNavigate} from 'react-router-dom'


function AddCategory() {
  const dispatch = useDispatch
 // const navigate = useNavigate()
  const [category, setCategory] = useState([{
                                          name: '',
                                          description :'',  
                                    }])
  
// handleChange 
  const handleChange =(e )=>{   
    setCategory({...category,
      [e.target.id] : e.target.value,
    }) 
    console.log(category)
  }


  const addCategory = ()=>{
    console.log(category)
    //dispatch(createCategory(category))
    //navigate('/admin/viewCategories')
  }
  return (
    <div>
      <div className="container justify-content-center pt-5 "> 
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
            <form onSubmit={addCategory}>
              {/* Product Name input type text*/}
              <div className="form-group">
                <label htmlFor="name" className="font-weight-bold">Category</label>
                <input type="text" className="form-control" id="name" onChange={handleChange} placeholder="name"/>
              </div>
              {/* Category Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="description" onChange={handleChange} rows="3"></textarea>
              </div>
             
              {/*Click button  to add category*/}
              <button  type="submit"  className="btn btn-dark   font-weight-bold">Add Category</button>
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default AddCategory