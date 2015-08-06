FROM iojs:latest

MAINTAINER Tyler Garlick <tjgarlick@gmail.com>

COPY . /src

WORKDIR /src

RUN npm install \
    npm install forever -g

EXPOSE 4000

CMD ["forever", "start", "index.js"]