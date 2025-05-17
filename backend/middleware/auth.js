
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // use Bearer token

    if (!token) return res.status(401).json({ message: 'Auth failed' });

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("Decoded token on backend:", decoded);  // Should print the payload {id: "..."}
req.user = decoded;
next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

export default authUser;
