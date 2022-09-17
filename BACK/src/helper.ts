import jwt from 'jsonwebtoken';

export function verifyJWT(req: any, res: any, next: any){
    const token = req.headers['token'];
    if (!token) return res.status(401).json({ message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });
      req.userId = decoded.id;
      next();
    });
}