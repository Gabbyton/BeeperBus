# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.3.0

FROM node:${NODE_VERSION}-alpine as base

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Copy the rest of the source files into the image.
COPY package.json package.json
COPY package-lock.json package-lock.json

# Expose the port that the application listens on.
EXPOSE 3000

FROM base as prod
run npm ci --production
COPY . .
CMD npm start
