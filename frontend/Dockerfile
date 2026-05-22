# ─── Stage 1: Build Angular App ───────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

ARG API_URL=/api/v1

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
# Bake API base URL for nginx reverse-proxy (relative /api/v1) or absolute override
RUN sed -i.bak "s|apiUrl:.*|apiUrl: '${API_URL}',|" src/environments/environment.ts && \
    sed -i.bak "s|apiUrl:.*|apiUrl: '${API_URL}',|" src/environments/environment.prod.ts && \
    rm -f src/environments/*.bak
RUN npm run build -- --configuration production

# ─── Stage 2: Serve with Nginx ────────────────────────────────────────────────
FROM nginx:1.27-alpine

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
