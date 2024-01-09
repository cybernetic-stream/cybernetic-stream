FROM node:slim
ENV IS_CONTAINER true
WORKDIR /app

COPY ./ ./

RUN npm install

CMD ["node", "index.js"]
