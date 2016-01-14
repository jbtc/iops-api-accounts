FROM node:latest

MAINTAINER Tyler Garlick <tjgarlick@gmail.com>

ADD package.json package.json
RUN npm install

ADD . .

EXPOSE 4000

CMD ["node", "index.js"]
