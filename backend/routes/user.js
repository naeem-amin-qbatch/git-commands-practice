import { Router } from "express";
import pkg from 'bcryptjs';
import jet from 'jsonwebtoken';
import dotenv from 'dotenv'
import User from '../schema/user.js';
import Auth from '../middlewares/jwt-auth.js';
const { hash, compare } = pkg;
const { sign } = jet;
const app = Router();
const { TOKEN_KEY } = process.env;
dotenv.config()

app.post("/adduser", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const foundUser = await User.findOne({ email: email })
  if (foundUser) {
    return res.status(409).send({ message: 'User Already Exist' })
  } else {
    const hashedPassword = await hash(password.toString(), 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    })
    await user.save(err => {
      if (err) {
        return res.status(409).send(err)
      } else {
        return res.status(200).send({ message: "successful registered" })
      }
    })
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email });
      if (user && await (compare(password, user.password))) {
        const token = sign(
          { user_id: user._id, email },
          TOKEN_KEY,
          {
            expiresIn: "30d",
          }
        );
        user.token = token;
        return res.status(200).json(user); 
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      return res.status(500).send(err)
    }
  }
})

app.get('/all', async (req, res) => {
  try {
    const data = await User.find({})
    return res.status(200).send(data)
  } catch (e) {
    return res.status(500).send(data)
  }
})

app.get('/:id', Auth, async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    return res.status(200).send(data)
  } catch (e) {
    return res.status(500).send(data)
  }
})

app.post('/getuser', Auth, async (req, res) => {
  return res.status(200).send("Welcome 🙌 ");
})

export default app;