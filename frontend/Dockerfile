# build environment
FROM node:18.2.0-alpine as build
RUN mkdir "frontend"
WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json

RUN npm install

COPY . /frontend

RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=build /frontend/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]