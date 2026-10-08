ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine AS install-dependencies
WORKDIR /application
COPY --chown=node:node package.json package-lock.json ./
RUN npm clean-install

FROM node:${NODE_VERSION}-alpine AS build-project
WORKDIR /application
COPY --chown=node:node . .
COPY --from="install-dependencies" --chown=node:node /application/package.json /application/package-lock.json ./
COPY --from="install-dependencies" --chown=node:node /application/node_modules ./node_modules
RUN npm run build

FROM node:${NODE_VERSION}-alpine AS runtime
WORKDIR /application
COPY --from="build-project" --chown=node:node /application/dist/kristaal-board .
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

ARG PORT=4000

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=3s --retries=3 --start-period=10s \
  CMD sh -c 'wget -q --spider "http://127.0.0.1:${PORT}/health" || exit 1'

ENV PORT=${PORT}
ENV NODE_ENV=production

USER node

CMD ["node", "server/server.mjs"]
