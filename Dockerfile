FROM node:18.15.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]