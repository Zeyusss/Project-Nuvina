import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/',(req,res)=> res.send("API is working"))
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)
app.use('/api/user',userRouter)

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
}).catch((err) => {
  console.error('DB connection failed:', err);
});

export default app;