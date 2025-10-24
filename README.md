# Kube Credential

Kube Credential is a minimal microservice‑based application for issuing and verifying digital credentials. It demonstrates how two independently scalable Node.js/TypeScript services can share a persistent SQLite database while exposing clean JSON APIs and providing a simple React front‑end for user interaction.

## Project structure

| Path | Purpose |
|------|---------|
| `backend/issuance-service` | Express service that issues new credentials and reports health. |
| `backend/verification-service` | Express service that verifies credentials and reports health. |
| `frontend` | Vite + React client with tabs for issuing and verifying. |
| `shared` | Directory mapped to `/app/shared`; stores the `credentials.db`. |

## Features

* **Issue credentials**: submit `name`, `email`, `courseTitle`, and `issuer` to create a new credential with a unique ID and certificate number.
* **Duplicate prevention**: ensures a credential is not issued twice for the same email and course title.
* **Verify credentials**: check whether a credential exists by providing `email` and `courseTitle`. Returns validity and metadata if found.
* **Worker awareness**: responses include the host or pod name (`workerPod`) that processed the request, enabling insight into load‑balanced deployments.
* **Health checks**: both services expose `/health` endpoints for readiness/liveness probes.

## Prerequisites

* Node.js 18+ and `npm` for local development.
* Docker if you prefer containerised deployment using `docker-compose`.

## Setup and running

1. **Clone the repository**:

```bash
git clone https://github.com/AniXT91/Kube_credential.git
cd Kube_credential
```

2. **Install dependencies**:

```bash
# issuance service
cd backend/issuance-service && npm install

# verification service
cd ../verification-service && npm install

# frontend
cd ../../frontend && npm install
```

3. **Environment configuration**: create `.env` files as shown below to set the service ports and front‑end API endpoints.

```bash
# backend/issuance-service/.env
PORT=3001

# backend/verification-service/.env
PORT=3002

# frontend/.env
VITE_ISSUANCE_API=http://localhost:3001/api/credentials
VITE_VERIFICATION_API=http://localhost:3002/api/credentials
```

4. **Start the services**:
   * **Issuance service**: run `npm run dev` in `backend/issuance-service`.
   * **Verification service**: run `npm run dev` in `backend/verification-service`.
   * **Front‑end**: run `npm run dev` in `frontend` and open `http://localhost:5173`.

## Running with Docker Compose

If you prefer to use Docker, a `docker-compose.yml` file is provided. Build and run all services with:

```bash
docker-compose up --build
```

This command starts three containers: **issuance** (port 3001), **verification** (port 3002) and the **front‑end** (port 5173). The `./shared` directory is mounted into `/app/shared` so both services persist and share the SQLite database.

## API overview

### Issuance service

| Method & path | Description | Required body fields |
|---------------|-------------|---------------------|
| `POST /issue` | Issue a new credential | `name`, `email`, `courseTitle`, `issuer` |
| `GET /health` | Health check with status/timestamp | – |

A successful call to `POST /issue` returns the newly issued credential along with a message indicating the worker that processed it. If the credential already exists, the response includes `success: false` and a descriptive message.

### Verification service

| Method & path | Description | Required body fields |
|---------------|-------------|---------------------|
| `POST /verify` | Verify an existing credential | `email`, `courseTitle` |
| `GET /health` | Health check with status/timestamp | – |

`POST /verify` returns a `verification` object. If the credential exists, `valid: true` with metadata (`issuedAt`, `issuedBy`, `certificateNumber` and `workerPod`) is returned; otherwise `valid: false`.

## Testing

Each back‑end service includes Jest test suites (`npm test` within each service directory). The front‑end uses Vitest (`npm test` in the `frontend` directory). Tests cover API logic and React components.

## Notes

* The SQLite database (`credentials.db`) is created automatically the first time the issuance service runs. Deleting this file resets the data.
* You can customise the port numbers and API endpoints via the `.env` files to suit your environment.
