FROM node

WORKDIR /app

COPY . /app

RUN npm --prefix /app/packages/main_vue install

CMD [ "npm", "serve" ]