FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 6514/udp 6514/tcp 6515/tcp
CMD ["npm", "start"]
