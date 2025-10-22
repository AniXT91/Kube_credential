import { Request, Response } from 'express';
import credentialService from '../services/credentialService';
import { CredentialInput } from '../models/credential';

class CredentialController {
  async issueCredential(req: Request, res: Response): Promise<void> {
    try {
      // Validate input
      const { name, email, courseTitle, issuer } = req.body;
      
      if (!name || !email || !courseTitle || !issuer) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
        return;
      }

      const input: CredentialInput = {
        name,
        email,
        courseTitle,
        issuer
      };

      // Issue credential
      const result = await credentialService.issueCredential(input);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(409).json(result); // 409 Conflict for duplicate
      }
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async healthCheck(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      status: 'healthy',
      service: 'issuance-service',
      timestamp: new Date().toISOString()
    });
  }
}

export default new CredentialController();