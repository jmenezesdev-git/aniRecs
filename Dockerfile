FROM node:22-alpine3.19
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm config set strict-ssl false
RUN npm install
COPY . .
EXPOSE 3020
CMD npm run dev