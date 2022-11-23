import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navbar/navbar";
import Products from "../product/products";
import DiscriprionDrawer from '../drawer/drawer';
import Footer from "../footer/footer";
import { getAllProducts } from "../../redux/slices/product";
import pic from '../../assests/images/home-bg.png';
import './home-page.css';
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((store) => store.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [])

  return (
    <div>
      <NavBar />
      <div className="container-fluid image text-white">
        <img src={pic} className="img-fluid img-tag w-100" alt="" />
        <div className="carousel-caption heading d-flex justify-content-center align-items-center">
          <h1 className="fw-bold display-1">Ecommerce</h1>
        </div>
      </div>
      <div>
        <h2 className="fw-bold text-center mt-5">Products</h2>
        <hr />
        <div className="container d-flex mt-2 flex-wrap justify-content-center">
          {
            allProducts && allProducts.map(product => (
              <Products key={product._id} product={product} />
            ))
          }
        </div>
      </div>
      <DiscriprionDrawer />
      <Outlet/>
      <p>After stash command testing</p>
      <Footer />
    </div>
  )
}

export default HomePage