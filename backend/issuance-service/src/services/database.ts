import sqlite3 from 'sqlite3';
import { Credential } from '../models/credential';
import fs from 'fs';
import path from 'path';

class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    //Absolute path to the shared database (same for both services)
    const dbPath = '/app/shared/credentials.db';

    // Ensure directory exists (inside container)
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Initialize SQLite database
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Failed to open shared credentials.db:', err);
      } else {
        console.log(`✅ Database connected at ${dbPath}`);
        this.initializeDatabase();
      }
    });
  }

  private initializeDatabase() {
    const sql = `
      CREATE TABLE IF NOT EXISTS credentials (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        courseTitle TEXT NOT NULL,
        issuer TEXT NOT NULL,
        issuedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        workerPod TEXT NOT NULL,
        certificateNumber TEXT UNIQUE NOT NULL
      )
    `;

    this.db.run(sql, (err) => {
      if (err) {
        console.error('❌ Error creating table:', err);
      } else {
        console.log('✅ Database initialized successfully');
      }
    });
  }

  // Check if credential exists
  async checkCredentialExists(email: string, courseTitle: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT id FROM credentials WHERE email = ? AND courseTitle = ?';
      this.db.get(sql, [email, courseTitle], (err, row) => {
        if (err) {
          console.error('❌ Error checking credential:', err);
          reject(err);
        }
        resolve(!!row);
      });
    });
  }

  // Save new credential
  async saveCredential(credential: Credential): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO credentials (id, name, email, courseTitle, issuer, workerPod, certificateNumber)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      this.db.run(sql, [
        credential.id,
        credential.name,
        credential.email,
        credential.courseTitle,
        credential.issuer,
        credential.workerPod,
        credential.certificateNumber
      ], (err) => {
        if (err) {
          console.error('❌ Error inserting credential:', err);
          reject(err);
        } else {
          console.log(`✅ Credential saved for ${credential.email}`);
          resolve();
        }
      });
    });
  }
}

export default new DatabaseService();
