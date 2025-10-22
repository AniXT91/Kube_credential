import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import credentialRoutes from './routes/credentialRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/credentials', credentialRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response,next:express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Issuance Service running on port ${PORT}`);
  console.log(`Worker Pod: ${process.env.HOSTNAME || 'local'}`);
});

export default app;