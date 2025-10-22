import { Request, Response } from 'express';
import verificationService from '../services/verificationService';

class VerificationController {
  async verifyCredential(req: Request, res: Response): Promise<void> {
    try {
      const { email, courseTitle } = req.body;

      if (!email || !courseTitle) {
        res.status(400).json({ success: false, message: 'Missing required fields' });
        return;
      }

      const result = await verificationService.verifyCredential(email, courseTitle);

      res.status(200).json({
        success: true,
        verification: result
      });
    } catch (err) {
      console.error('Verification error:', err);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async healthCheck(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      status: 'healthy',
      service: 'verification-service',
      timestamp: new Date().toISOString()
    });
  }
}

export default new VerificationController();

