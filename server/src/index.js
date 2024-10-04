import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

mongoose.connect("mongodb+srv://<db_user>:<db_password>@recipe.97exd.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Recipe");

app.listen(3001, () => console.log('SERVER STARTED !!'));