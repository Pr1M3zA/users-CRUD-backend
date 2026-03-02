const express = require('express');
import { Request, Response } from 'express';
const app = express();
const port = 3000;

type User = {
   id: number;
   username: string;
   fullname: string;
   email: string;
   password: string;
   active: boolean;
}

const users: User[] = [];
app.use(express.json());

app.get('/users', (req: Request, res: Response) => {
   res.status(200).json(users.filter(u => u.active).map(u => ({ id: u.id, username: u.username, fullname: u.fullname, email: u.email })));
});

app.get('/users/:id', (req: Request, res: Response) => {
   const user = users.find(u => u.id === parseInt(req.params.id as string) && u.active);
   if (!user) {
      return res.status(404).json({ message: "User not found" });
   }
   res.status(200).json(user);
});

app.post('/users', (req: Request, res: Response) => {
   const { username, fullname, email, password } = req.body;
   if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required: username, fullname, email, password" });
   }
   if (users.some(u => u.username === username && u.active)) {
      return res.status(409).json({ message: "Username already exists" });
   }
   const newUser = { id: users.length + 1, username, fullname, email, password, active: true };
   users.push(newUser);
   res.status(201).json({ message: "User created successfully with id: " + newUser.id });
});

app.put('/users/:id', (req: Request, res: Response) => {
   const user = users.find(u => u.id === parseInt(req.params.id as string) && u.active); 
   if (!user) {
      return res.status(404).json({ message: "User not found" });
   }
   const { fullname, email, password } = req.body;
   if (fullname) user.fullname = fullname;
   if (email) user.email = email;
   if (password) user.password = password;
   res.status(200).json({ message: "User updated successfully", user });
});

app.delete('/users/:id', (req: Request, res: Response) => {
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