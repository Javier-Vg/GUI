# FROM node:22.9.0
# WORKDIR /app
# COPY package*.json ./
# RUN npm install && npm install  react-router-dom

# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev"]
#Dockerfile production
FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.27.1-alpine AS production
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]