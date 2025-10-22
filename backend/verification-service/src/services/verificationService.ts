import databaseService from './database';
import os from 'os';

class VerificationService {
  private getWorkerPodName(): string {
    return process.env.HOSTNAME || os.hostname() || 'worker-verify';
  }

  async verifyCredential(email: string, courseTitle: string) {
    const credential = await databaseService.findCredential(email, courseTitle);

    if (credential) {
      return {
        valid: true,
        issuedAt: credential.issuedAt,
        issuedBy: credential.workerPod,
        certificateNumber: credential.certificateNumber,
        workerPod: this.getWorkerPodName(),
        message: 'Credential verified successfully'
      };
    }

    return {
      valid: false,
      message: 'Credential not found',
      workerPod: this.getWorkerPodName()
    };
  }
}

export default new VerificationService();

