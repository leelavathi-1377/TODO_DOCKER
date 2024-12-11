FROM node:16-slim
RUN apt-get update && apt-get install -y curl iputils-ping && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json ./ 
RUN npm cache clean --force
RUN npm install 
COPY . . 
EXPOSE 4000
CMD ["npm", "run", "dev"]
