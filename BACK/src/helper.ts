import jwt from 'jsonwebtoken';

export function verifyJWT(req: any, res: any, next: any){
  const auth = req.headers.authorization;
  const token = auth.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });
      req.userId = decoded.id;
      next();
    });
}

export function auditLog({ cardId, cardTitle, action }: any) {
  const dateTime = new Date().toLocaleString('pt-br');
  console.info(`${dateTime} - Card ${cardId} - ${cardTitle} - ${action}`);
}