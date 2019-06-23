FROM node

COPY package.json .
RUN npm install -g && npm install -g react-scripts
WORKDIR /mnt
EXPOSE 3000

CMD ["npm", "start"]
