FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npx prisma generate

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
