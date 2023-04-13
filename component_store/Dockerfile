FROM node:18.14.2-bullseye-slim

# Safely terminate Node.js Docker containers
RUN apt update && apt upgrade -y && apt install -y --no-install-recommends dumb-init

# Optimize tools like express
ENV NODE_ENV production

# Least-privileged User
USER node

# Create app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY --chown=node:node package*.json ./

# Bundle app source and set owner to node, for permissions to access files
COPY --chown=node:node config ./config
COPY --chown=node:node migrations ./migrations
COPY --chown=node:node public ./public
COPY --chown=node:node src ./src
COPY --chown=node:node views ./views
COPY --chown=node:node winston_logger ./winston_logger
COPY --chown=node:node knexfile.js ./

# Install only production dependencies
RUN npm ci --only=production

EXPOSE 3000

# dumb-init acts like init process, which when spawns node app and makes sure that all signals are forewarded to node
CMD [ "dumb-init", "node", "src/app.js" ]
