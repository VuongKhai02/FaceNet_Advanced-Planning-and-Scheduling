FROM node:16.13-alpine
RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 6080
CMD [ "npm", "start" ]