# Dockerfile Frontend - Development
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json / yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy seluruh source code
COPY . .

# Expose port Vite
EXPOSE 5173

# Jalankan Vite dev server di 0.0.0.0 supaya bisa diakses dari host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
