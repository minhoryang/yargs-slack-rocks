# COPY REGIONS TO `./Dockerfile`...

# #region Build-rocks
# DO MODIFY HERE DIRECTLY, CHECK `./Dockerfile.base` FOR REFERENCE.
FROM node:20.10-buster AS build-rocks
WORKDIR /tmp/workdir
ADD . .
## ADD ./vendor/apis/ ./src_external_interfaces/apis/
RUN yarn && yarn build:cjs
# #endregion

# Run-rocks
FROM node:20.10-buster AS runtime-rocks
WORKDIR /workdir
## WORKDIR /workdir/rocks
## ADD ./package.json ./yarn.lock ./
## #region Copy-rocks
COPY --from=build-rocks /tmp/workdir/package.json ./package.json
COPY --from=build-rocks /tmp/workdir/node_modules/ ./node_modules/
COPY --from=build-rocks /tmp/workdir/dist/ ./dist/
# #endregion
## WORKDIR /workdir

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT
CMD ["yarn", "cli:cjs"]
