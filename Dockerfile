# FROM node:16.13-alpine
# RUN mkdir -p /app
# WORKDIR /app

# COPY package*.json ./
# RUN npm install
# COPY . .

# EXPOSE 6080
# CMD [ "npm", "run","start:test" ]

FROM node:16.13-alpine AS build
WORKDIR /app
ENV NODE_OPTIONS=--max_old_space_size=4096
COPY package*.json ./
RUN yarn install
COPY . .
RUN npm run build

FROM nginx:1.25.1-alpine-slim
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf  /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
