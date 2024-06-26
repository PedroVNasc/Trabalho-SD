# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY app/* ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Start the application using ts-node-dev
CMD ["pnpm", "build"]
