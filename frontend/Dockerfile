FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

ENV PORT=4200

EXPOSE 4200

CMD ["node", "dist/frontend/server/server.mjs"]
