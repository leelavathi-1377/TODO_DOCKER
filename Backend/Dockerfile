FROM node:16-slim
RUN apt-get update && apt-get install -y curl iputils-ping && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json ./ 
RUN npm install
COPY  . .
EXPOSE 3000
CMD ["npm", "start"]




# # Stage 1: Build Stage
# FROM node:16-slim AS build
# RUN apt-get update && apt-get install -y curl iputils-ping && rm -rf /var/lib/apt/lists/*
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --production
# COPY . .

# # Stage 2: Runtime Stage
# FROM gcr.io/distroless/nodejs:16 AS runtime
# WORKDIR /app
# COPY package.json package-lock.json ./
# COPY --from=build /app /app
# EXPOSE 3000
# CMD ["npm", "start"]






