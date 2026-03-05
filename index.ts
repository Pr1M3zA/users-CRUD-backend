const express = require('express');
import { Request, Response } from 'express';
const app = express();
const port = 3000;

type User = {
   id: number;
   fullname: string;
   email: string;
   password: string;
   birthdate: Date;
   active: boolean;
}

const authMiddleware = (req: Request, res: Response, next: Function) => {
   const authHeader = req.headers.authorization;
   if (!authHeader) 
      return res.status(401).json({ message: "Authoritzation header is missing" });
   if(authHeader !== 'fha5HpDXSXSjKU0QCbdXiz1a')
      return res.status(401).json({ message: "Invalid authorization header" });
   next();
}

app.use(authMiddleware);

const users: User[] = [];
app.use(express.json());

app.get('/users', (req: Request, res: Response) => {
   res.status(200).json(users.filter(u => u.active).map(u => ({ id: u.id, fullname: u.fullname, email: u.email, birthdate: u.birthdate})));
});

app.get('/users/:id', (req: Request, res: Response) => {
   const user = users.find(u => u.id === parseInt(req.params.id as string) && u.active);
   if (!user) {
      return res.status(404).json({ message: "User not found" });
   }
   res.status(200).json(user);
});

const tokenMiddleware = (req: Request, res: Response, next: Function) => {
   const token = req.headers['token'];
   if (!token) 
      return res.status(401).json({ message: "Token is missing" });
   if(token !== 'HIZe4D32twWOUP9h0I1IVTlr')
      return res.status(401).json({ message: "Invalid token" });
   next();
}

app.post('/users', tokenMiddleware, (req: Request, res: Response) => {
   const { fullname, email, password, birthdate } = req.body;
   if ( !fullname || !email || !password || !birthdate) {
      return res.status(400).json({ message: "All fields are required: username, fullname, email, password" });
   }
   if (users.find(u => u.email === email && u.active)) {
      return res.status(409).json({ message: "Email already exists" });
   }
   const newUser = { id: users.length + 1, fullname, email, password, birthdate: new Date(birthdate), active: true };
   users.push(newUser);
   res.status(201).json({ message: "User created successfully with id: " + newUser.id });
});

app.put('/users/:id', tokenMiddleware, (req: Request, res: Response) => {
   const user = users.find(u => u.id === parseInt(req.params.id as string) && u.active); 
   if (!user) {
      return res.status(404).json({ message: "User not found" });
   }
   const { fullname, email, password, birthdate } = req.body;
   if (fullname) user.fullname = fullname;
   if (email) user.email = email;
   if (password) user.password = password;
   if (birthdate) user.birthdate = new Date(birthdate);
   res.status(200).json({ message: "User updated successfully", user });
});

app.delete('/users/:id', tokenMiddleware, (req: Request, res: Response) => {
   const userIndex = users.findIndex(u => u.id === parseInt(req.params.id as string) && u.active);
   if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
   }
   users[userIndex].active = false;
   res.status(200).json({ message: "User deleted successfully" });
});   

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});