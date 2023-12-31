# Use a base image with Node.js and MongoDB pre-installed
FROM node:18.18.0-buster-slim

# Set the working directory inside the container
RUN mkdir /app && chown node:node /app
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
USER node
COPY --chown=node:node package.json package-lock.json* ./
# Install dependencies
RUN npm ci

COPY --chown=node:node . .
# Copy the API source code to the working directory
COPY . .

# Expose the API port
EXPOSE 3000

# Set the environment variables for the MongoDB connection
ENV MONGO_HOST=mongodb
ENV MONGO_PORT=27017
ENV MONGO_DB=unidosnosenhor
ENV MONGO_USER=unidos
ENV MONGO_PASSWORD=gloriacristo

# Start the MongoDB service
CMD mongod --bind_ip_all --dbpath=/data/db &

# Start the API server
CMD ["npm", "start"]
