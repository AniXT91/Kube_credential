export interface IssuanceResponse {
  success: boolean;
  message: string;
  credential?: {
    id: string;
    name: string;
    email: string;
    courseTitle: string;
    issuer: string;
    issuedAt: string;
    workerPod: string;
    certificateNumber: string;
  };
}

export interface VerificationResponse {
  success: boolean;
  verification: {
    valid: boolean;
    issuedAt?: string;
    issuedBy?: string;
    certificateNumber?: string;
    workerPod?: string;
    message?: string;
  };
}
