FROM node:latest

MAINTAINER Tyler Garlick <tjgarlick@gmail.com>

RUN mkdir -p /source
WORKDIR /source

COPY package.json /source
RUN npm install

COPY . /source

EXPOSE 4000

CMD ["npm", "start"]
