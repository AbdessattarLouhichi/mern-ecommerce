import { Button, Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addCart } from "src/store/api/cartApi"
import { formatCurrency } from "../../utilities/formatCurrency"

function ProductCard(item) {
    const dispatch = useDispatch()
    const addItem = async(data)=>{
        await dispatch(addCart(data))
    }
    return (
      <Card className="h-100">
         <Link to={'/productDetail/' +item._id} style={{textDecoration: "none"}} >
            <Card.Img
              variant="top"
              src={item.image}
              height="200px"
              style={{ objectFit: "cover" }}
            />
         </Link>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-5">{item.name}</span>
            <span className="fs-6 text-muted">{formatCurrency(item.price)}</span>
          </Card.Title>
          <div className="mt-auto">
            <Button className="w-100" onClick={() => addItem({productId: item._id, quantity: 1})}>
                + Add To Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    )
  }
  
  export default ProductCard