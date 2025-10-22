# backend/issuance-service/Dockerfile
FROM --platform=linux/arm64 node:18-bullseye-slim

WORKDIR /app

# only copy manifests first to leverage Docker cache
COPY package*.json ./

# tools required to compile native modules like sqlite3
RUN apt-get update && apt-get install -y python3 make g++ \
  && npm ci \
  && npm rebuild sqlite3 --build-from-source \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# now copy the rest of the source (without node_modules thanks to .dockerignore)
COPY . .

EXPOSE 3001

CMD ["npm","run","dev"]
