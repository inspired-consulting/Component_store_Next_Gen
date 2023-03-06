FROM node:18.14.2-bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "src/app.js" ]
