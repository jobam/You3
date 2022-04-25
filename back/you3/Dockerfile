FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

COPY build .

RUN apk add python
RUN  wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl
RUN  chmod a+rx /usr/local/bin/youtube-dl
RUN  chmod a+rx ./youtube-dl
RUN  apk update
RUN  apk add ffmpeg

EXPOSE 8080

CMD [ "node", "app.js" ]
