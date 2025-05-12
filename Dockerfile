# Etapa 1: Construcción de la aplicación Angular
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compilar Angular en modo producción
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:stable-alpine

# Copiar el build Angular al directorio público de Nginx
COPY --from=builder /app/dist/inventario-frontend /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]