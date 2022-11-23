import { Router } from "express";
import Product from '../schema/product.js'
const app = Router();

app.post("/insert", async (req, res) => {
  try {
    const data = await Product.insertMany(productsData);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send(e)
  }
});

app.get("/all", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).send(allProducts);
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.get('/:id', async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send(e)
  }
})

export default app;