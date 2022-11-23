import  verify  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(500).send("A token is required for authentication");
  }
  try {
    const decoded = verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(500).send("Invalid Token");
  }
  return next();
};

export default verifyToken