export interface Credential{
	id:string;
	name:string;
	email:string;
	courseTitle:string;
	issuer:string;
	issuedAt:Date;
	workerPod:string;
	certificateNumber:string;
}

export interface CredentialInput{
	name:string;
	email:string;
	courseTitle:string;
	issuer:string;
}
