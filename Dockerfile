FROM node:latest
MAINTAINER Tyler Garlick <tjgarlick@gmail.com>


RUN npm install nodemon -g
RUN cd /src; npm install

EXPOSE 4000