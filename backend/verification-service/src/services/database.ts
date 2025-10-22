import sqlite3 from 'sqlite3';
import { Credential } from '../models/credential';

class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    // ✅ Use absolute path inside the container (shared volume)
    const dbPath = '/app/shared/credentials.db';

    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Failed to connect to shared database:', err);
      } else {
        console.log('✅ Connected to shared credentials.db');
      }
    });
  }

  async findCredential(email: string, courseTitle: string): Promise<Credential | null> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM credentials WHERE email = ? AND courseTitle = ?`;

      this.db.get(sql, [email, courseTitle], (err: Error | null, row: any) => {
        if (err) {
          console.error('❌ Database error:', err);
          return reject(err);
        }

        if (!row) {
          return resolve(null);
        }

        const credential: Credential = {
          id: row.id,
          name: row.name,
          email: row.email,
          courseTitle: row.courseTitle,
          issuer: row.issuer,
          issuedAt: new Date(row.issuedAt),
          workerPod: row.workerPod,
          certificateNumber: row.certificateNumber
        };

        resolve(credential);
      });
    });
  }
}

export default new DatabaseService();
