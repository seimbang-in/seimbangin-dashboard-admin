# Build stage
FROM node:20-alpine as build

WORKDIR /app
# copy everything
COPY . .
# install dependencies
RUN npm i
# build the SvelteKit app
RUN npm run build

# Run stage (separate it from the build stage, to save disk storage)
FROM node:20-alpine

WORKDIR /app

# copy stuff from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./

# expose the app's port
EXPOSE 3000
# run the server
CMD ["node", "./index.js"]
