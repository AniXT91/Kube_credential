import axios from "axios";

const issuanceBase = import.meta.env.VITE_ISSUANCE_API as string;
const verificationBase = import.meta.env.VITE_VERIFICATION_API as string;

console.log("ENV CHECK:", import.meta.env.VITE_ISSUANCE_API, import.meta.env.VITE_VERIFICATION_API);

export const api = {
  issue: (payload: {
    name: string;
    email: string;
    courseTitle: string;
    issuer: string;
  }) => axios.post(`${issuanceBase}/issue`, payload),

  verify: (payload: {
    email: string;
    courseTitle: string;
  }) => axios.post(`${verificationBase}/verify`, payload),

  healthIssuance: () => axios.get(`${issuanceBase}/health`),
  healthVerification: () => axios.get(`${verificationBase}/health`),
};
