FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Render assigns a dynamic port via $PORT – we must listen on it
EXPOSE 3000

CMD ["node", "server.js"]
