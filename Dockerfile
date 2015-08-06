FROM iojs:latest

MAINTAINER Tyler Garlick <tjgarlick@gmail.com>

COPY . /src

WORKDIR /src

RUN npm install \
    npm install nodemon -g

EXPOSE 4000

CMD ["nodemon", "/src/index.js"]