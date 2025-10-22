const { v4: uuidv4 } = require('uuid');
import { Credential, CredentialInput } from '../models/credential';
import databaseService from './database';
import os from 'os';

class CredentialService {
  // Get worker pod name (for Kubernetes)
  private getWorkerPodName(): string {
    // In Kubernetes, this will be the actual pod name
    // For local development, we use hostname
    return process.env.HOSTNAME || os.hostname() || 'worker-1';
  }

  // Generate unique certificate number
  private generateCertificateNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `CERT-${timestamp}-${random}`;
  }

  async issueCredential(input: CredentialInput): Promise<{ 
    success: boolean; 
    message: string; 
    credential?: Credential 
  }> {
    try {
      // Check if credential already exists
      const exists = await databaseService.checkCredentialExists(
        input.email, 
        input.courseTitle
      );

      if (exists) {
        return {
          success: false,
          message: 'Credential already issued for this email and course'
        };
      }

      // Create new credential
      const credential: Credential = {
        id: uuidv4(),
        ...input,
        issuedAt: new Date(),
        workerPod: this.getWorkerPodName(),
        certificateNumber: this.generateCertificateNumber()
      };

      // Save to database
      await databaseService.saveCredential(credential);

      return {
        success: true,
        message: `Credential issued by ${credential.workerPod}`,
        credential
      };
    } catch (error) {
      console.error('Error issuing credential:', error);
      throw new Error('Failed to issue credential');
    }
  }
}

export default new CredentialService();