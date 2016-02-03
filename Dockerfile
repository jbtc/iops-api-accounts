FROM mhart/alpine-node

RUN apk add --update make gcc g++ python
RUN apk add --update nodejs

ADD package.json package.json
RUN npm install

ADD . .

# If you had native dependencies you can now remove build tools
# RUN apk del make gcc g++ python && \
rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

EXPOSE 4000

CMD ["node", "index.js"]
