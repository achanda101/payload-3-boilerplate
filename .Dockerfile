FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node/app
COPY package*.json  ./
COPY yarn.lock ./

RUN yarn install --production

# Copy built application from builder stage
COPY --from=builder /home/node/app/dist ./dist

EXPOSE 3000

# Environment variables should be provided at runtime via:
# - Railway environment variables
# - Docker run -e flags
# - Docker compose env_file
# NEVER use ENV or ARG for secrets like DATABASE_URI, PAYLOAD_SECRET, S3_SECRET_ACCESS_KEY

CMD ["node", "dist/server.js"]
