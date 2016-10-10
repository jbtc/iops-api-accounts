FROM node:latest

ADD package.json package.json
RUN npm install

ADD . .

EXPOSE 4000

CMD ["node", "."]
