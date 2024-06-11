# base image
FROM node:16

# set working directory
WORKDIR /server

# install and cache app dependencies
COPY package.json /server/package.json

COPY *json /server/

COPY . .

RUN npm install

# start app
CMD ["npm", "start"]