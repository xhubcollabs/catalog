FROM node:16.13-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:1.21.6-alpine as production-stage
COPY --from=build-stage /app/dist/pwa /usr/share/nginx/html
COPY ./config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
