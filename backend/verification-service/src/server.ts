import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import verificationRoutes from './routes/verificationRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/credentials', verificationRoutes);

app.listen(PORT, () => {
  console.log(`Verification Service running on port ${PORT}`);
  console.log(`Worker Pod: ${process.env.HOSTNAME || 'local'}`);
});

export default app;


