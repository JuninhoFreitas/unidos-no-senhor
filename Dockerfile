###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

USER node

###################
# PRODUCTION
###################
RUN apk update && apk add bash
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD /wait-for-it.sh postgresdb:5432 -- node dist/main