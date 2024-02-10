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

# Set the environment variables for the PostgresDB connection
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_DB=unidos_db
ENV POSTGRES_USER=unidos
ENV POSTGRES_PASSWORD=gloriacristo

# Start the API server
CMD ["npm", "start"]
