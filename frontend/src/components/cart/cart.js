import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavBar from "../navbar/navbar";
import pic from '../../assests/images/cart-bg.png';
import Footer from "../footer/footer";
import { showCart, updateQuantity, setCartState, removeCartProduct } from '../../redux/slices/cart';
import './cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { userId: user_id } = useSelector((state) => state.user);
  const { cartUpdate, cartRemove } = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState([]);
  let [bill, setBill] = useState(0);
  useEffect(() => {
    dispatch(showCart(user_id))
      .then((response) => {
        setCartData(response.payload.data)
      })
  }, []);

  useEffect(() => {
    if (cartUpdate) {
      dispatch(showCart(user_id))
        .then((response) => {
          setCartData(response.payload.data)
        });
      dispatch(setCartState({ field: 'cartUpdate', value: false }));
    }
  }, [cartUpdate]);

  useEffect(() => {
    if (cartRemove) {
      dispatch(showCart(user_id))
        .then((response) => {
          setCartData(response.payload.data)
        });
      dispatch(setCartState({ field: 'cartRemove', value: false }));
    }
  }, [cartRemove]);

  const updateCart = (quantity, productId) => {
    dispatch(updateQuantity({ user_id, productId, quantity }));
  }

  const handleChangeQuantity = (value, id) => {
    if (value > 1) {
      const temp = cartData?.map((items) => {
        if (items._id === id) {
          return {
            ...items,
            quantity: value
          }
        }
        return { ...items }
      });
      setCartData(temp);
      updateCart(value, id);
    }
  }

  const handleIncrement = (pId) => {
    const temp = cartData?.map((items) => {
      if (items._id === pId) {
        return {
          ...items,
          quantity: items.quantity + 1,
        }
      }
      return { ...items }
    });
    const product = temp.filter(({ _id }) => _id === pId);
    const { quantity } = product[0];
    setCartData(temp);
    updateCart(quantity, pId);
  }

  const handleDecrement = (user_id, p_id) => {
    const temp = cartData?.map((items) => {
      if (items._id === p_id) {
        if (items.quantity > 1) {
          return {
            ...items,
            quantity: items.quantity - 1,
          }
        } else {
          dispatch(removeCartProduct({ p_id, user_id }))
          console.log(p_id,user_id)
          .then((response) => {
            setCartData(response.payload.data)
          });
        }
      }
      return { ...items }
    });
    const product = temp.filter(({ _id }) => _id === p_id);
    const { quantity } = product[0];
    setCartData(temp);
    updateCart(quantity, p_id);
  }

  const handleRemoveCartItem = (p_id, user_id) => {
    dispatch(removeCartProduct({ p_id, user_id }))
      .then((response) => {
        setCartData(response.payload.data)
      });
  }
  let handleTotalBill = (price, quantity) => {
    console.log(price, quantity);
    bill = bill + price * quantity;
    setBill(bill);
  }

  return (
    <>
      <NavBar />
      <div className="container-fluid text-white p-0">
        <div className="cart-img d-flex justify-content-center align-items-center">
          <img src={pic} className="img-fluid w-100" alt="" />
          <div className="carousel-caption cart-title d-flex justify-content-center align-items-center">
            <h1 className="fw-bold display-3">Cart</h1>
          </div>
        </div>
      </div>

      {cartData ? (
        <>
          <div className="d-flex justify-content-center fw-bold fs-1 mt-2">Your Cart</div>
          <div className="container mt-5 fs-5">
            <div className="row">
              <div className="d-flex justify-content-between">
                <div className="col-style col-2"><b>Image</b></div>
                <div className="col-style col-2"><b>Name</b></div>
                <div className="col-style col-2"><b>Price</b></div>
                <div className="col-style col-2"><b>Qauntity</b></div>
                <div className="col-style col-1"><b>Subtotal</b></div>
                <div className="col-style col-1"><b>Remove</b></div>
              </div>
              <hr className="hrCart" />
            </div>

            {cartData?.map(item => {
              return (
                <div className="row">
                  <div className="d-flex justify-content-between">
                    <div className="col-style col-2 mt-2 mb-2">
                      <img className="h-75 w-75" src={item.image} />
                    </div>
                    <div className="col-style col-2">{item.name}</div>
                    <div className="col-style col-2">{item.price}</div>
                    <div className="col-style col-2 quantity">
                      <button className="btn btn-primary fw-bold me-2" onClick={() => handleDecrement(user_id,item._id)}>-</button>
                      <input type="text"
                        className="form-control text-center ms-3 me-3"
                        value={item.quantity}
                        style={{ width: "50px" }}
                        onChange={(e) => handleChangeQuantity(e.target.value, item._id)}
                      />
                      <button className="btn btn-primary fw-bold ms-2" onClick={() => handleIncrement(item._id)}>+</button>
                    </div>
                    <div className="col-style col-1" onChange={() => handleTotalBill(item.price, item.quantity)}>{item.price * item.quantity}</div>
                    <div className="col-style col-1" onClick={() => handleRemoveCartItem(item._id, user_id)}><Link className="text-danger" ><FaTrashAlt /></Link></div>
                  </div>
                  <hr className="hrCart" />
                </div>
              );
            })}
          </div>
        </>
      ) : <h2 className="d-flex justify-content-center fs-4">Cart is empty</h2>
      }
      <div className="row d-flex justify-content-end mt-5">
        <div className="col-md-4">
          {console.log(cartData)}
          <b><p className="d-flex justify-content-center fs-4">Summary</p></b>
          <hr className="hrCartTotal" />
          <h2 >Total Bill: <span className="text-success fs-1">{cartData?.reduce((total, item) => total + (item.price * item.quantity), 0)}</span> Rs</h2>
          <div className="d-grid gap-2">
            <button className="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Cart