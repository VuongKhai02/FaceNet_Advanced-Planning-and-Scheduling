FROM node:16.13-alpine
RUN echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 6080
CMD [ "npm", "start" ]