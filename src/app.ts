import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import connectDB from './db';

//routes
import userRoutes from './routes/user.route';
import roleRoutes from './routes/role.route';
import uploadRoutes from './routes/upload.route';
import categoryRoutes from './routes/category.route';
import expenseRoutes from './routes/expense.route';
import authRoutes from './routes/auth.route';


const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/echo', (req, res) => {
  res.json({ message: 'Welcome to the server' });
});

// routes
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
