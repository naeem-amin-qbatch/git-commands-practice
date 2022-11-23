import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductId } from "../../redux/slices/product";
import { addToCart } from "../../redux/slices/cart";
import './products.css'

const Products = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId: user_id } = useSelector((state) => state.user);
  const handleCartClick = (product, user_id) => {
    dispatch(addToCart({ product, user_id }))
  }

  const handleProductClick = (productId) => {
    navigate(`product/${productId}`)
    dispatch(setProductId(productId));
  }

  return (
    <div className="productCard" onClick={() => handleProductClick(product._id)}>
      <div className="card divStyle" >
        <img className="imgStyle" src={product.image} alt={product.name} />
        <div className="card-body">
          <div className="d-flex justify-content-center align-items-center">
            <h5 className="card-title d-flex align-items-center">{product.name}</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className="d-flex justify-content-center align-items-center">Price: {product.price}</p>
          </div>
          <div className="d-flex justify-content-center">
            <ReactStars
              value={product.rating}
              isHalf={true}
            />
          </div>
          <div className="text-center">
            <a className="btn btn-primary mt-2" onClick={(e) => {
              e.stopPropagation();
              handleCartClick(product, user_id)

            }}>Add to Cart</a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Products;