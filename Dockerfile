FROM node:latest

MAINTAINER Tyler Garlick <tjgarlick@gmail.com>

COPY . /src

RUN cd /src; npm install; npm install nodemon -g

EXPOSE 4000

CMD ["nodemon", "/src/index.js"]