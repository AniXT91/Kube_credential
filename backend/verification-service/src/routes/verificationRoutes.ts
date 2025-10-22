import { Router } from 'express';
import verificationController from '../controllers/verificationController';

const router = Router();

router.post('/verify', verificationController.verifyCredential);
router.get('/health', verificationController.healthCheck);

export default router;

