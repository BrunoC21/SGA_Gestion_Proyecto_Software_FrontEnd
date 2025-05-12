# Etapa 1: Build de Angular
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# Etapa 2: Nginx sirve los archivos estáticos
FROM nginx:alpine

# Borra el contenido por defecto
RUN rm -rf /usr/share/nginx/html/*

# COPIA SOLO el contenido real de la app
COPY --from=build /app/dist/inventario-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]