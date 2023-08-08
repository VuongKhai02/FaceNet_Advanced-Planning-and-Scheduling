FROM node:16.13-alpine
RUN echo 524288 > /proc/sys/fs/inotify/max_user_watches
RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 6080
CMD [ "npm", "start" ]