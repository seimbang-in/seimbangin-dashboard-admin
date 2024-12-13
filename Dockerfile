# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install Bun (pastikan menggunakan versi terbaru)
RUN curl -fsSL https://bun.sh/install | bash

# Menambahkan Bun ke PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Copy package.json dan bun.lockb
COPY package*.json ./
COPY bun.lockb ./

# Install dependensi dengan Bun
RUN bun install

# Salin semua file ke dalam container
COPY . .

# Build aplikasi SvelteKit menggunakan Bun
RUN bun build

# Prune dependencies yang tidak diperlukan untuk production
RUN bun install --production

# Production Stage
FROM node:22-alpine

WORKDIR /app

# Install Bun di stage production
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Salin hasil build dan node_modules dari builder
COPY --from=builder /app/build /app/build/
COPY --from=builder /app/node_modules /app/node_modules/

# Salin package.json dan bun.lockb agar bisa dijalankan di production
COPY package.json ./
COPY bun.lockb ./

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Set environment untuk production
ENV NODE_ENV=production

# Jalankan aplikasi menggunakan Bun
CMD [ "bun", "start" ]
