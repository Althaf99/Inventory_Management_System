

# # ==== CONFIGURE =====
# # Use a Node 16 base image
# FROM node:14-alpine 
# # Set the working directory to /app inside the container
# WORKDIR /app
# # Copy app files
# COPY . .
# # ==== BUILD =====
# # Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# RUN npm ci
# # Build the app
# RUN yarn build
# # ==== RUN =======
# # Set the env to "production"
# ENV NODE_ENV production
# # Expose the port on which the app will be running (3000 is the default that `serve` uses)
# EXPOSE 3000
# # Start the app
# CMD [ "npx", "serve", "build" ]

FROM node:14-alpine 
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]