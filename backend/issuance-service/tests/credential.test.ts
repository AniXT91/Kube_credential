import request from 'supertest';
import app from '../src/server';

describe('Credential Issuance API', () => {
  it('should issue a new credential', async () => {
    const credentialData = {
      name: 'John Doe',
      email: 'john@example.com',
      courseTitle: 'Node.js Mastery',
      issuer: 'Tech Academy'
    };

    const response = await request(app)
      .post('/api/credentials/issue')
      .send(credentialData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('Credential issued by');
    expect(response.body.credential).toHaveProperty('id');
    expect(response.body.credential).toHaveProperty('certificateNumber');
  });

  it('should reject duplicate credentials', async () => {
    const credentialData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      courseTitle: 'React Fundamentals',
      issuer: 'Tech Academy'
    };

    // First request - should succeed
    await request(app)
      .post('/api/credentials/issue')
      .send(credentialData)
      .expect(201);

    // Second request - should fail
    const response = await request(app)
      .post('/api/credentials/issue')
      .send(credentialData)
      .expect(409);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('already issued');
  });

  it('should validate email format', async () => {
    const invalidData = {
      name: 'Test User',
      email: 'invalid-email',
      courseTitle: 'Test Course',
      issuer: 'Test Issuer'
    };

    const response = await request(app)
      .post('/api/credentials/issue')
      .send(invalidData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid email');
  });
});