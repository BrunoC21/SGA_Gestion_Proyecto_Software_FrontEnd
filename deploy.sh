#!/bin/bash

# CONFIGURA ESTOS DATOS:
SERVER_USER=usuario_remoto
SERVER_IP=192.168.1.100  # IP o dominio de tu servidor
REMOTE_DIR=/home/$SERVER_USER/inventario-frontend

echo "🔧 Paso 1: Construyendo imagen Docker localmente"
docker build -t inventario-frontend:latest .

echo "📤 Paso 2: Subiendo archivos al servidor..."
ssh $SERVER_USER@$SERVER_IP "rm -rf $REMOTE_DIR"
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"
scp -r * $SERVER_USER@$SERVER_IP:$REMOTE_DIR

echo "🖥️ Paso 3: Desplegando en el servidor remoto"
ssh $SERVER_USER@$SERVER_IP << EOF
  cd $REMOTE_DIR

  echo "🛑 Parando y eliminando contenedores anteriores..."
  docker-compose down

  echo "📦 Construyendo imagen y levantando contenedores..."
  docker-compose up -d --build

  echo "✅ Despliegue finalizado en: http://$SERVER_IP"
EOF