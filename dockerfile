# Etapa 1: Construir la aplicación Angular (Frontend)
FROM node:18.16.1-alpine AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build --prod

# Etapa 2: Configuración del backend (Express.js) y servir el frontend
FROM node:18.16.1-alpine
WORKDIR /app/backend

# Instalar dependencias del backend
COPY backend/package*.json ./
RUN npm install

# Copiar el backend
COPY backend/ ./

# Copiar los archivos compilados del frontend desde la etapa anterior
COPY --from=build-frontend /app/frontend/dist/frontend/browser ./public

# Exponer el puerto en el que corre el servidor
EXPOSE 3000

# Iniciar la aplicación de Express
CMD ["node", "index.js"]
