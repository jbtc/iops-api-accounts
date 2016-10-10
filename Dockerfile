FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

EXPOSE 4000

CMD ["node", "."]
