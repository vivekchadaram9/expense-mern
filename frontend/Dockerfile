# Stage 1: build
FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: serve
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
