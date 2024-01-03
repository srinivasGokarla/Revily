const jwt = require('jsonwebtoken');
const secretKey = 'SecretKey';
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing Token' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
      }
      req.user = decoded;
      next();
    });
  };
  
  module.exports = { verifyToken };
