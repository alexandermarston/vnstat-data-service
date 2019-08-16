FROM node:11.8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app depedencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY . /usr/src/app

EXPOSE 9045
CMD ["npm", "start", "--production"]
