FROM node:16.13-alpine
RUN echo "fs.inotify.max_user_instances=524288" >> /etc/sysctl.conf
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
RUN echo "fs.inotify.max_queued_events=524288" >> /etc/sysctl.conf
RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 6080
CMD [ "npm", "start" ]