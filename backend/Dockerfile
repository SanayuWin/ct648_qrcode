# Use the official Bun image as the base image
FROM oven/bun:1.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and lock file (assuming bun.lockb is the correct filename)
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application source code
COPY . .

# Set the environment variable for production
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 8087

# Start the application using Bun
CMD ["bun", "run", "start"]


