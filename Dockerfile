# ===== Build Stage =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

# ===== Production Stage =====
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
