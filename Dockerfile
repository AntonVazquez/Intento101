# syntax = docker/dockerfile:1

# Ajustar NODE_VERSION como se desee
ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# La aplicación Node.js se ubicará aquí
WORKDIR /app

# Configurar el entorno de producción
ENV NODE_ENV="production"

# Etapa temporal de construcción para reducir el tamaño de la imagen final
FROM base as build

# Instalar paquetes necesarios para construir módulos de node
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Instalar módulos de node
COPY package-lock.json package.json ./
RUN npm ci

# Copiar el código de la aplicación
COPY ./client /app/client
COPY ./service /app/service

# Copiar variables de entorno desde la subcarpeta "service"
COPY ./service/.env /app/service/.env

# Etapa final para la imagen de la aplicación
FROM base

# Copiar la aplicación construida
COPY --from=build /app /app

# Cambiamos a la carpeta de servicio donde se encuentra server.js
WORKDIR /app/service
CMD [ "npm", "start" ]

# Exponer el puerto 3000
EXPOSE 3000
