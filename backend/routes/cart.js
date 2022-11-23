import { Router } from "express";
import { Types } from 'mongoose';
import Cart from "../schema/cart.js"
import Product from "../schema/product.js";
const app = Router();

app.post("/add-to-cart", async (req, res) => {
  const user_id = req.body.user_id;
  const product = Types.ObjectId(req.body.product);
  try {
    const cart = await Cart.findOne({ user_id });
    if (cart) {
      let insertProductId = product;
      let cart_id = cart._id;
      let bool = true;
      for (let i = 0; i < cart.products.length; i++) {
        let cartProductId = cart.products[i].product;
        if (cartProductId === insertProductId) {
          bool = false;
          break;
        }
      }
      if (bool === true) {
        try {
          await Cart.updateOne(
            { _id: cart_id },
            { $addToSet: { products: { product } } },
          )
          return res.status(200).send("Successfully updated");
        } catch (e) {
          return res.status(500).send(e);

        }
      }
      res.status(409).send('Already in the cart')
    }
    else {
      let products = [{ product }]
      try {
        const newCart = await Cart.create({ user_id, products });
        return res.status(200).send(newCart);
      } catch (e) {
        return res.status(500).send(e);

      }
    }
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});


app.get('/:id', async (req, res) => {
  const user_id = req.params.id;
  try {
    const userCart = await Cart.findOne({ user_id })
    let { products } = userCart;

    const productIdsFromCart = products.map((item) => item.product)
    let productDetail = await Product.find({ _id: { $in: productIdsFromCart } });
    const finalCart = productDetail.map((product) => {
      const {
        _id,
        image,
        name,
        price
      } = product;
      const cartProduct = products.find(({ product }) => product.toString() === _id.toString());
      if (cartProduct) {
        const { quantity } = cartProduct;
        return {
          _id,
          image,
          name,
          price,
          quantity
        }
      }
    });
    return res.status(200).send(finalCart)
  } catch (e) {
    return res.status(404).send('Cart not found')
  }
})


app.put('/updateCart', async (req, res) => {
  const { user_id, productId, quantity } = req.body;
  try {
    const userCart = await Cart.findOne({ user_id })
    let { products } = userCart;
    products = products?.map(({ product, _id, quantity: qty }) => {
      if (product.toString() == productId) {
        return {
          product,
          quantity,
          _id
        }
      }
      return {
        product,
        quantity: qty,
        _id
      };
    });
    await Cart.updateOne(
      { user_id },
      {
        $set: { products }
      }
    )
    return res.status(200).send('Cart Updated Succesfully')
  } catch (e) {
    return res.status(404).send('Cart not found')
  }
})

app.put('/removeCartProduct', async (req, res) => {
  const { user_id, product } = req.body;
  if(user_id,product){
  try {
    const userCart = await Cart.findOne({ user_id })
    let { products } = userCart;
    products = products?.filter((item) => item.product.toString() !== product);
    await Cart.updateOne(
      { user_id },
      {
        $set: { products }
      }
    )
    return res.status(200).send('Item removed Succesfully')
  } catch (e) {
    return res.status(404).send('Cart not found')
  }
}else{
  res.status(400).send('User id or product id not found')
}
})


export default app;