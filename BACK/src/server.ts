import { config } from './config';
import express from 'express'
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

let app = express();
const route = Router()

app.use(express.json())


route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
})

app.post('/login', (req, res, next) => {
    if(req.body.login === config.login && req.body.password === config.password){
        const id = `${config.login}_${config.password}`;
        const token = jwt.sign({ id }, config.secret, {
            expiresIn: 300 // expires in 15min
        });
        return res.json(token);
    }
    
    res.status(500).json({message: 'Invalid login!'});
})

app.use(route)

app.listen(5001, () => 'Server running on port 5001')