import request from 'supertest';
import app from '../src/server';

describe('Credential Verification API', () => {

  it('should verify an existing credential successfully', async () => {
    // Data that already exists in credentials.db
    const requestData = {
      email: 'john@test.com',
      courseTitle: 'Kubernetes Mastery'
    };

    const response = await request(app)
      .post('/api/credentials/verify')
      .send(requestData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.verification.valid).toBe(true);
    expect(response.body.verification).toHaveProperty('issuedAt');
    expect(response.body.verification).toHaveProperty('certificateNumber');
  });

  it('should return false for non-existent credentials', async () => {
    const requestData = {
      email: 'nonexistent@xyz.com',
      courseTitle: 'Fake Course'
    };

    const response = await request(app)
      .post('/api/credentials/verify')
      .send(requestData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.verification.valid).toBe(false);
    expect(response.body.verification.message).toBe('Credential not found');
  });

  it('should validate required fields', async () => {
    const response = await request(app)
      .post('/api/credentials/verify')
      .send({ email: '' })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Missing required fields');
  });
});
