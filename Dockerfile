# Estágio 1: Build
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Estágio 2: Produção
FROM node:lts-alpine
WORKDIR /app
# Copia apenas as dependências e o código do estágio anterior
COPY --from=builder /app ./

# Expõe a porta e define as variáveis de ambiente (sem segredos)
EXPOSE 8001
ENV NODE_ENV=test

# Comando para iniciar
CMD ["npm", "run", "server"]