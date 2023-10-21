
const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
   
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
     console.log(decodedToken)
      req.body.userId = decodedToken.userId ;
      req.body.username=decodedToken.username
      next();
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed' });
    }
  };
  const isAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
   
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken)
    if ( decodedToken.role === 'admin') {
     
      return next(); 
    }
    return res.status(401).json({ error: 'Permission denied. Admin access required.' });
  }
  
 
  
  module.exports={
   auth,
   isAdmin
  }
