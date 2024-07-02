FROM node:18.20.2-alpine3.19 AS builder
LABEL authors="kakan"

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG BASE_API_URL

COPY . .
RUN NEXT_PUBLIC_BASE_API_URL=$BASE_API_URL npm run build

# Create a slimmer runtime image
FROM node:18.20.2-alpine3.19 AS runner

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app .

EXPOSE 3000

CMD [ "npm", "run", "start" ]