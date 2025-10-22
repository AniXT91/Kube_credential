import { Router } from 'express';
import credentialController from '../controllers/credentialController';

const router = Router();

// POST /api/credentials/issue
router.post('/issue', credentialController.issueCredential);

// GET /api/health
router.get('/health', credentialController.healthCheck);

export default router;