FROM node:18-alpine
#ENV NODE_ENV=develope
WORKDIR /at-tempo-app
COPY ["package*.json","./"]
RUN npm i -g nodemon
RUN npm i
# COPY . .
# EXPOSE 3000
CMD ["npm","run","dev"]