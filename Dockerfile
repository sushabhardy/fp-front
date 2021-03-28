FROM node:14

WORKDIR /app

COPY package.json .

# RUN npm install

COPY . .

EXPOSE 8100

CMD ["npm", "start"]